package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.dto.board.*;
import com.youngclimb.domain.model.dto.member.CreateMember;
import com.youngclimb.domain.model.dto.member.MemberDto;
import com.youngclimb.domain.model.dto.member.MemberInfo;
import com.youngclimb.domain.model.dto.member.UserDto;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final BoardMediaRepository boardMediaRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final BoardScrapRepository boardScrapRepository;
    private final CommentRepository commentRepository;
    private final CategoryRepository categoryRepository;
    private final CenterRepository centerRepository;
    private final WallRepository wallRepository;
    private final CenterLevelRepository centerLevelRepository;
    private final FollowRepository followRepository;
    private final MemberRankExpRepository memberRankExpRepository;
    private final AmazonS3 amazonS3;

    // 게시글 읽기
    @Override
    public List<BoardDto> readAllBoard(String email, Pageable pageable, UserPrincipal currUser) {
        List<BoardDto> boardDtos = new ArrayList<>();

        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDateTime"));
        for (Board board : boards) {

            // 게시글 DTO 세팅
            BoardDto boardDto = BoardDto.builder()
                    .id(board.getBoardId())
                    .solvedDate(board.getSolvedDate())
                    .content(board.getContent())
                    .like(boardLikeRepository.countByBoard(board))
                    .view(boardScrapRepository.countByBoard(board))
                    .isLiked(boardLikeRepository.existsByBoardAndMember(board, member))
                    .isScrap(boardScrapRepository.existsByBoardAndMember(board, member))
                    .commentNum(commentRepository.countByBoard(board))
                    .build();

            // 작성 유저 정보 세팅
            Member writer = board.getMember();
            CreateMember createUser = CreateMember.builder()
                    .nickname(writer.getNickname())
                    .image(writer.getMemberProfileImg())
//                    .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                    .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), member.getMemberId()))
                    .build();

            boardDto.setCreateUser(createUser);

            LocalDateTime createdTime = board.getCreatedDateTime();

            // 작성날짜 세팅
            String timeText = createdTime.getYear() + "년 " + createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
            Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
            if (minus <= 10) {
                timeText = "방금 전";
            } else if (minus <= 60) {
                timeText = minus + "분 전";
            } else if (minus <= 1440) {
                timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
            } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
                timeText = createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
            }

            boardDto.setCreatedAt(timeText);

            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());

            // 카테고리 정보 세팅
            Category category = categoryRepository.findByBoard(board).orElseThrow();
            boardDto.setCenterId(category.getCenter().getId());
            boardDto.setCenterName(category.getCenter().getName());
            boardDto.setCenterLevelId(category.getCenterlevel().getId());
            boardDto.setCenterLevelColor(category.getCenterlevel().getColor());
            boardDto.setWallId(category.getWall().getId());
            boardDto.setWallName(category.getWall().getName());
            boardDto.setDifficulty(category.getDifficulty());
            boardDto.setHoldColor(category.getHoldColor());


            // 댓글 DTO 1개 세팅
            List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
            if (!comments.isEmpty()) {
                CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                        .nickname(comments.get(0).getMember().getNickname())
                        .comment(comments.get(0).getContent())
                        .build();
                boardDto.setCommentPreview(commentPreviewDto);
            }

            // List add
            boardDtos.add(boardDto);
        }

        return boardDtos;
    }

    // 게시글 작성
    @Override
    public void writeBoard(BoardCreate boardCreate, MultipartFile file) {

        // 게시글 저장하기
        Board board = boardCreate.toBoard();
        Member member = memberRepository.findById(boardCreate.getMemberId()).orElseThrow();
        board.setMember(member);
        boardRepository.save(board);

        // 카테고리 저장하기
        Category category = Category.builder()
                .board(board)
                .center(centerRepository.findById(boardCreate.getCenterId()).orElseThrow())
                .wall(wallRepository.findById(boardCreate.getWallId()).orElseThrow())
                .centerlevel(centerLevelRepository.findById(boardCreate.getCenterLevelId()).orElseThrow())
                .holdColor(boardCreate.getHoldColor())
                .difficulty(centerLevelRepository.findById(boardCreate.getCenterLevelId()).orElseThrow().getLevel().getRank())
                .build();
        categoryRepository.save(category);

        // 이미지 저장하기
        if (!file.isEmpty()) {
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            System.out.println(fileName);
            try (InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket + "/boardImg", fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
            BoardMedia boardMedia = BoardMedia.builder().board(board).mediaPath(amazonS3.getUrl(bucket + "/boardImg", fileName).toString())
                    .build();
            boardMediaRepository.save(boardMedia);
        }
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일입니다");
        }
    }

    // 게시글 좋아요
    @Override
    public Boolean boardLike(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        BoardLike boardLike = BoardLike.builder()
                .board(board)
                .member(member)
                .build();
        boardLikeRepository.save(boardLike);

        return true;
    }

    // 게시글 좋아요 취소
    @Override
    public Boolean boardUnlike(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        boardLikeRepository.deleteByBoardAndMember(board, member);
        return false;
    }


    // 게시글 - 댓글 상세보기
    @Override
    public BoardDetailDto readAllComments(Long boardId, Long memberId) {
        BoardDetailDto boardDetailDto = new BoardDetailDto();

        Member member = memberRepository.findById(memberId).orElseThrow();

        // 게시글 DTO 세팅
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member writer = board.getMember();
//        BoardDto boardDto = board.toBoardDto();
        BoardDto boardDto = BoardDto.builder()
                .id(board.getBoardId())
                .solvedDate(board.getSolvedDate())
                .content(board.getContent())
                .like(boardLikeRepository.countByBoard(board))
                .view(boardScrapRepository.countByBoard(board))
                .isLiked(boardLikeRepository.existsByBoardAndMember(board, member))
                .isScrap(boardScrapRepository.existsByBoardAndMember(board, member))
                .commentNum(commentRepository.countByBoard(board))
                .build();

        Category category = categoryRepository.findByBoard(board).orElseThrow();
        BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();

        CreateMember createUser = CreateMember.builder()
                .nickname(writer.getNickname())
                .image(writer.getMemberProfileImg())
//                .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), memberId))
                .build();

        boardDto.setCreateUser(createUser);
        boardDto.setCenterId(category.getCenter().getId());
        boardDto.setCenterName(category.getCenter().getName());
        boardDto.setCenterLevelId(category.getCenterlevel().getId());
        boardDto.setCenterLevelColor(category.getCenterlevel().getColor());
        boardDto.setWallId(category.getWall().getId());
        boardDto.setWallName(category.getWall().getName());
        boardDto.setDifficulty(category.getDifficulty());
        boardDto.setHoldColor(category.getHoldColor());
        boardDto.setMediaPath(boardMedia.getMediaPath());


        // 작성날짜 세팅

        LocalDateTime createdTime = board.getCreatedDateTime();
        String timeText = createdTime.getYear() + "년 " + createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
        Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
        if (minus <= 10) {
            timeText = "방금 전";
        } else if (minus <= 60) {
            timeText = minus + "분 전";
        } else if (minus <= 1440) {
            timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
        } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
            timeText = createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
        }

        boardDto.setCreatedAt(timeText);


        boardDetailDto.setBoardDto(boardDto);

        // 댓글 DTO 세팅
        List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {

            // 댓글 작성자
            Member cWriter = comment.getMember();
            CreateMember cCreateMember = CreateMember.builder()
                    .nickname(cWriter.getNickname())
                    .image(cWriter.getMemberProfileImg())
//                    .rank(memberRankExpRepository.findByMember(cWriter).orElseThrow().getRank().getName())
                    .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(cWriter.getMemberId(), memberId))
                    .build();

            // 댓글 세팅
            CommentDto commentDto = comment.toCommentDto();
            // 댓글 작성자 세팅
            commentDto.setUser(cCreateMember);
            // 댓글 좋아요 여부
            commentDto.setIsLiked(commentLikeRepository.existsByCommentAndMember(comment, member));

            // 대댓글 세팅
            List<Comment> reComments = commentRepository.findByParentId(comment.getId());
            List<CommentDto> reCommentDtos = new ArrayList<>();
            for(Comment reComment : reComments) {
                Member rcWriter = reComment.getMember();
                CreateMember rcCreateMember = CreateMember.builder()
                        .nickname(rcWriter.getNickname())
                        .image(rcWriter.getMemberProfileImg())
//                    .rank(memberRankExpRepository.findByMember(cWriter).orElseThrow().getRank().getName())
                        .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(rcWriter.getMemberId(), memberId))
                        .build();

                CommentDto reCommentDto = reComment.toCommentDto();
                reCommentDto.setUser(rcCreateMember);
                reCommentDto.setIsLiked(commentLikeRepository.existsByCommentAndMember(reComment, member));
                reCommentDtos.add(reCommentDto);
            }

            commentDto.setReComment(reCommentDtos);
            commentDtos.add(commentDto);
        }
        boardDetailDto.setCommentDtos(commentDtos);

        return boardDetailDto;
    }

    // 댓글 좋아요
    @Override
    public Boolean commentLike(Long commentId, String email) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        CommentLike commentLike = CommentLike.builder()
                .comment(comment)
                .member(member)
                .build();

        commentLikeRepository.save(commentLike);
        return true;
    }

    // 댓글 좋아요 취소
    @Override
    public Boolean commentUnlike(Long commentId, String email) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        commentLikeRepository.deleteByCommentAndMember(comment, member);
        return false;
    }

    // 댓글 작성
    @Override
    public void writeComment(CommentCreate commentCreate) {

        // 댓글 저장하기
        Comment comment = commentCreate.toComment();
        Board board = boardRepository.findById(commentCreate.getBoardId()).orElseThrow();
        Member member = memberRepository.findById(commentCreate.getMemberId()).orElseThrow();

        comment.setBoard(board);
        comment.setMember(member);
        commentRepository.save(comment);
    }

    // 대댓글 작성
    @Override
    public void writeRecomment(CommentCreate commentCreate) {
        Comment comment = commentCreate.toComment();
        Board board = boardRepository.findById(commentCreate.getBoardId()).orElseThrow();
        Member member = memberRepository.findById(commentCreate.getMemberId()).orElseThrow();

        comment.setBoard(board);
        comment.setMember(member);
        commentRepository.save(comment);

    }


    // 사용자 정보 조회
    @Override
    public MemberDto getUserInfoByUserId(String userId) {

        Member member = memberRepository.findByNickname(userId).orElseThrow();
        MemberDto memberDto = new MemberDto();

        memberDto.setIsfollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(1L, member.getMemberId()));

        UserDto userDto = new UserDto();

        userDto.setImage(member.getMemberProfileImg());
        userDto.setNickname(member.getNickname());
        userDto.setGender(member.getGender());
        userDto.setIntro(member.getProfileContent());
        userDto.setHeight(member.getHeight());
        userDto.setShoeSize(member.getShoeSize());
        userDto.setWingspan(member.getWingspan());
        userDto.setRank(memberRankExpRepository.findByMember(member).orElseThrow().getRank().getName());
        userDto.setBoardNum(boardRepository.countByMember(member));
        userDto.setFollowingNum(followRepository.countByFollowing(member));
        userDto.setFollowerNum(followRepository.countByFollower(member));

        memberDto.setUser(userDto);

        List<Board> boards = boardRepository.findByMember(member, Sort.by(Sort.Direction.DESC, "createdDateTime"));
        List<BoardDto> boardDtos = new ArrayList<>();

        for (Board board : boards) {

            // 게시글 DTO 세팅
            BoardDto boardDto = BoardDto.builder()
                    .id(board.getBoardId())
                    .solvedDate(board.getSolvedDate())
                    .content(board.getContent())
                    .like(boardLikeRepository.countByBoard(board))
                    .view(boardScrapRepository.countByBoard(board))
                    .isLiked(boardLikeRepository.existsByBoardAndMember(board, member))
                    .isScrap(boardScrapRepository.existsByBoardAndMember(board, member))
                    .commentNum(commentRepository.countByBoard(board))
                    .build();

            // 작성 유저 정보 세팅
            Member writer = board.getMember();
            CreateMember createUser = CreateMember.builder()
                    .nickname(writer.getNickname())
                    .image(writer.getMemberProfileImg())
                    .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                    .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), member.getMemberId()))
                    .build();

            boardDto.setCreateUser(createUser);

            LocalDateTime createdTime = board.getCreatedDateTime();

            // 작성날짜 세팅
            String timeText = createdTime.getYear() + "년 " + createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
            Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
            if (minus <= 10) {
                timeText = "방금 전";
            } else if (minus <= 60) {
                timeText = minus + "분 전";
            } else if (minus <= 1440) {
                timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
            } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
                timeText = createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
            }

            boardDto.setCreatedAt(timeText);

            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());

            // 카테고리 정보 세팅
            Category category = categoryRepository.findByBoard(board).orElseThrow();
            boardDto.setCenterId(category.getCenter().getId());
            boardDto.setCenterName(category.getCenter().getName());
            boardDto.setCenterLevelId(category.getCenterlevel().getId());
            boardDto.setCenterLevelColor(category.getCenterlevel().getColor());
            boardDto.setWallId(category.getWall().getId());
            boardDto.setWallName(category.getWall().getName());
            boardDto.setDifficulty(category.getDifficulty());
            boardDto.setHoldColor(category.getHoldColor());


            // 댓글 DTO 1개 세팅
            List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
            if (!comments.isEmpty()) {
                CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                        .nickname(comments.get(0).getMember().getNickname())
                        .comment(comments.get(0).getContent())
                        .build();
                boardDto.setCommentPreview(commentPreviewDto);
            }
            // List add
            boardDtos.add(boardDto);
        }
        memberDto.setBoards(boardDtos);

        List<BoardScrap> scraps = boardScrapRepository.findByMember(member, Sort.by(Sort.Direction.DESC, "boardScrapId"));
        List<BoardDto> scrapDtos = new ArrayList<>();

        for (BoardScrap scrap : scraps) {

            // 게시글 DTO 세팅
            BoardDto scrapDto = BoardDto.builder()
                    .id(scrap.getBoard().getBoardId())
                    .solvedDate(scrap.getBoard().getSolvedDate())
                    .content(scrap.getBoard().getContent())
                    .like(boardLikeRepository.countByBoard(scrap.getBoard()))
                    .view(boardScrapRepository.countByBoard(scrap.getBoard()))
                    .isLiked(boardLikeRepository.existsByBoardAndMember(scrap.getBoard(), member))
                    .isScrap(boardScrapRepository.existsByBoardAndMember(scrap.getBoard(), member))
                    .commentNum(commentRepository.countByBoard(scrap.getBoard()))
                    .build();

            // 작성 유저 정보 세팅
            Member writer = scrap.getBoard().getMember();
            CreateMember createUser = CreateMember.builder()
                    .nickname(writer.getNickname())
                    .image(writer.getMemberProfileImg())
                    .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                    .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), member.getMemberId()))
                    .build();

            scrapDto.setCreateUser(createUser);

            LocalDateTime createdTime = scrap.getBoard().getCreatedDateTime();

            // 작성날짜 세팅
            String timeText = createdTime.getYear() + "년 " + createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
            Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
            if (minus <= 10) {
                timeText = "방금 전";
            } else if (minus <= 60) {
                timeText = minus + "분 전";
            } else if (minus <= 1440) {
                timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
            } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
                timeText = createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
            }

            scrapDto.setCreatedAt(timeText);

            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(scrap.getBoard()).orElseThrow();
            scrapDto.setMediaPath(boardMedia.getMediaPath());

            // 카테고리 정보 세팅
            Category category = categoryRepository.findByBoard(scrap.getBoard()).orElseThrow();
            scrapDto.setCenterId(category.getCenter().getId());
            scrapDto.setCenterName(category.getCenter().getName());
            scrapDto.setCenterLevelId(category.getCenterlevel().getId());
            scrapDto.setCenterLevelColor(category.getCenterlevel().getColor());
            scrapDto.setWallId(category.getWall().getId());
            scrapDto.setWallName(category.getWall().getName());
            scrapDto.setDifficulty(category.getDifficulty());
            scrapDto.setHoldColor(category.getHoldColor());


            // 댓글 DTO 1개 세팅
            List<Comment> comments = commentRepository.findAllByBoard(scrap.getBoard(), Sort.by(Sort.Direction.DESC, "createdDatetime"));
            if (!comments.isEmpty()) {
                CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                        .nickname(comments.get(0).getMember().getNickname())
                        .comment(comments.get(0).getContent())
                        .build();
                scrapDto.setCommentPreview(commentPreviewDto);
            }
            // List add
            scrapDtos.add(scrapDto);
        }

        memberDto.setScraps(scrapDtos);

        return memberDto;
    }

    // 게시글 스크랩
    @Override
    public Boolean boardScrap(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        BoardScrap boardScrap = BoardScrap.builder()
                .board(board)
                .member(member)
                .build();
        boardScrapRepository.save(boardScrap);

        return true;
    }

    // 게시글 스크랩 취소
    @Override
    public Boolean boardUnScrap(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        boardScrapRepository.deleteByBoardAndMember(board, member);
        return false;
    }

}
