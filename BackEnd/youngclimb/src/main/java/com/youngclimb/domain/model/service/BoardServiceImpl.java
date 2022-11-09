package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.youngclimb.domain.model.dto.board.*;
import com.youngclimb.domain.model.dto.member.CreateMember;
import com.youngclimb.domain.model.dto.member.MemberDto;
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
import java.util.Comparator;
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
    private final ReportRepository reportRepository;
    private final MemberProblemRepository memberProblemRepository;
    private final RankRepository rankRepository;
    private final AmazonS3 amazonS3;


    // 게시글 읽기
    @Override
    public List<BoardDto> readAllBoard(String email, Pageable pageable) {
        List<BoardDto> boardDtos = new ArrayList<>();

        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDateTime"));
        for (Board board : boards) {
            if(board.getIsDelete() != 0) continue;
            // 게시글 Dto 세팅
            BoardDto boardDto = this.startDto(board, member);
            boardDto.setCreateUser(this.toCreateUser(board, member));

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
    public void writeBoard(String email, BoardCreate boardCreate, MultipartFile file) {

        // 게시글 저장하기
        Board board = boardCreate.toBoard();
        Member member = memberRepository.findByEmail(email).orElseThrow();
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
            try (InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket + "/boardImg", fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
            BoardMedia boardMedia = BoardMedia.builder().board(board).mediaPath(amazonS3.getUrl(bucket + "/boardImg", fileName).toString())
                    .build();
            boardMediaRepository.save(boardMedia);
        }

        // 유저 경험치 등급 저장하기
        // 게시물에서 등급 받아오기
        Level level = category.getCenterlevel().getLevel();

        // 회원 경험치 업데이트
        MemberRankExp memberExp = memberRankExpRepository.findByMember(member).orElseThrow();
        memberExp.addMemberExp(level.getExp());

        // 회원 푼 문제 업데이트
        MemberProblem memberProblem = memberProblemRepository.findByMember(member).orElseThrow();
        memberProblem.addProblem(level.getRank());
        memberProblemRepository.save(memberProblem);

        // 랭크 업데이트
        List<Rank> ranks = rankRepository.findAll();
        ranks.sort(new Comparator<Rank>() {
            @Override
            public int compare(Rank o1, Rank o2) {
                return (int) (o1.getQual() - o2.getQual());
            }
        });

        for (Rank tmp : ranks) {
            if ((memberProblem.findSolvedProblem(tmp.getProblem()) >= 3) && (tmp.getQual() <= memberExp.getMemberExp())) {
                memberExp.setRank(tmp);
                break;
            }
        }

        memberRankExpRepository.save(memberExp);


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
    public Boolean boardLikeCancle(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        boolean isLike = boardLikeRepository.existsByBoardAndMember(board, member);

        if (!isLike) {
            BoardLike boardLike = BoardLike.builder()
                    .board(board)
                    .member(member)
                    .build();
            boardLikeRepository.save(boardLike);

            return true;
        } else {
            boardLikeRepository.deleteByBoardAndMember(board, member);
            return false;
        }

    }

    // 게시글 - 댓글 상세보기
    @Override
    public BoardDetailDto readAllComments(Long boardId, String email) {
        BoardDetailDto boardDetailDto = new BoardDetailDto();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        // 게시글 DTO 세팅
        Board board = boardRepository.findById(boardId).orElseThrow();

        BoardDto boardDto = this.startDto(board, member);
        boardDto.setCreateUser(this.toCreateUser(board, member));

        boardDetailDto.setBoardDto(boardDto);

        // 댓글 DTO 세팅
        List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {

            CommentDto commentDto = this.toCommentDtos(comment, member);

            // 대댓글 세팅
            List<Comment> reComments = commentRepository.findByParentId(comment.getId());
            List<CommentDto> reCommentDtos = new ArrayList<>();
            for (Comment reComment : reComments) {

                CommentDto reCommentDto = this.toCommentDtos(reComment, member);
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
    public Boolean commentLikeCancle(Long commentId, String email) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        boolean isLike = commentLikeRepository.existsByCommentAndMember(comment, member);

        if (!isLike) {
            CommentLike commentLike = CommentLike.builder()
                    .comment(comment)
                    .member(member)
                    .build();

            commentLikeRepository.save(commentLike);
            return true;
        } else {
            commentLikeRepository.deleteByCommentAndMember(comment, member);
            return false;
        }

    }

    // 댓글 작성
    @Override
    public void writeComment(CommentCreate commentCreate, String email) {

        // 댓글 저장하기
        Comment comment = commentCreate.toComment();
        Board board = boardRepository.findById(commentCreate.getBoardId()).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        comment.setBoard(board);
        comment.setMember(member);
        commentRepository.save(comment);
    }

    // 대댓글 작성
    @Override
    public void writeRecomment(CommentCreate commentCreate, String email) {
        Comment comment = commentCreate.toComment();
        Board board = boardRepository.findById(commentCreate.getBoardId()).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        comment.setBoard(board);
        comment.setMember(member);
        commentRepository.save(comment);

    }


    // 사용자 정보 조회
    @Override
    public MemberDto getUserInfoByUserId(String userId, String loginEmail) {

        Member member = memberRepository.findByNickname(userId).orElseThrow();
        Member loginMember = memberRepository.findByEmail(loginEmail).orElseThrow();
        MemberDto memberDto = new MemberDto();

        memberDto.setFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(loginMember.getMemberId(), member.getMemberId()));

        memberDto.setUser(this.setUserDto(member));

        List<Board> boards = boardRepository.findByMember(member, Sort.by(Sort.Direction.DESC, "createdDateTime"));
        List<BoardDto> boardDtos = new ArrayList<>();

        for (Board board : boards) {

            BoardDto boardDto = this.startDto(board, member);
            boardDto.setCreateUser(this.toCreateUser(board, member));

            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());

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
            String timeText = createdTime.getYear() + "년 " + createdTime.getMonth().getValue() + "월 " + createdTime.getDayOfMonth() + "일";
            Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
            if (minus <= 10) {
                timeText = "방금 전";
            } else if (minus <= 60) {
                timeText = minus + "분 전";
            } else if (minus <= 1440) {
                timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
            } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
                timeText = createdTime.getMonth().getValue() + "월 " + createdTime.getDayOfMonth() + "일";
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

            // List add
            scrapDtos.add(scrapDto);
        }

        memberDto.setScraps(scrapDtos);

        return memberDto;
    }

    // 게시글 스크랩
    @Override
    public Boolean boardScrapCancle(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        boolean isScrap = boardScrapRepository.existsByBoardAndMember(board, member);

        if (!isScrap) {
            BoardScrap boardScrap = BoardScrap.builder()
                    .board(board)
                    .member(member)
                    .build();
            boardScrapRepository.save(boardScrap);

            return true;
        } else {
            boardScrapRepository.deleteByBoardAndMember(board, member);
            return false;
        }

    }

    // 게시글 신고하기
    public Boolean boardReport(Long boardId, String content, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        List<Report> boardList = reportRepository.findAllByBoard(board);
        int boardListLength = boardList.size();

        if (board.getMember() == member) {
            return Boolean.FALSE;
        }

        Report report = reportRepository.findByBoardAndMember(board, member).orElse(null);

        if (boardListLength >= 9) {
            board.setIsDelete(2);
        }

        if (report == null) {
            Report reportCreate = Report.builder()
                    .board(board)
                    .member(member)
                    .content(content)
                    .flag(0)
                    .build();

            reportRepository.save(reportCreate);

            return Boolean.TRUE;
        } else {
            return Boolean.FALSE;
        }
    }

    // 게시글 DTO 세팅
    public BoardDto startDto(Board board, Member member) {
        // 게시글 DTO 초기화
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

        // 작성날짜 세팅
        LocalDateTime createdTime = board.getCreatedDateTime();

        String timeText = createdTime.getYear() + "년 " + createdTime.getMonth().getValue() + "월 " + createdTime.getDayOfMonth() + "일";
        Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
        if (minus <= 10) {
            timeText = "방금 전";
        } else if (minus <= 60) {
            timeText = minus + "분 전";
        } else if (minus <= 1440) {
            timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
        } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
            timeText = createdTime.getMonth().getValue() + "월 " + createdTime.getDayOfMonth() + "일";
        }

        boardDto.setCreatedAt(timeText);

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

        return boardDto;
    }

    // 작성 유저 정보 세팅
    public CreateMember toCreateUser(Board board, Member member) {
        Member writer = board.getMember();
        CreateMember createUser = CreateMember.builder()
                .nickname(writer.getNickname())
                .image(writer.getMemberProfileImg())
                .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), member.getMemberId()))
                .build();
        return createUser;
    }

    public CommentDto toCommentDtos(Comment comment, Member member) {

        // 댓글 작성자
        Member cWriter = comment.getMember();
        CreateMember cCreateMember = CreateMember.builder()
                .nickname(cWriter.getNickname())
                .image(cWriter.getMemberProfileImg())
                .rank(memberRankExpRepository.findByMember(cWriter).orElseThrow().getRank().getName())
                .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(cWriter.getMemberId(), member.getMemberId()))
                .build();

        // 댓글 세팅
        CommentDto commentDto = comment.toCommentDto();
        // 댓글 작성자 세팅
        commentDto.setUser(cCreateMember);
        // 댓글 좋아요 여부
        commentDto.setIsLiked(commentLikeRepository.existsByCommentAndMember(comment, member));

        return commentDto;
    }
    public UserDto setUserDto(Member member) {
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
        userDto.setFollowingNum(followRepository.countByFollower(member));
        userDto.setFollowerNum(followRepository.countByFollowing(member));
        return userDto;
    }

    public BoardDto startDto(Board board, Member member) {
        // 게시글 DTO 초기화
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

        // 작성날짜 세팅
        LocalDateTime createdTime = board.getCreatedDateTime();

        String timeText = createdTime.getYear() + "년 " + createdTime.getMonth().getValue() + "월 " + createdTime.getDayOfMonth() + "일";
        Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
        if (minus <= 10) {
            timeText = "방금 전";
        } else if (minus <= 60) {
            timeText = minus + "분 전";
        } else if (minus <= 1440) {
            timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
        } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
            timeText = createdTime.getMonth().getValue() + "월 " + createdTime.getDayOfMonth() + "일";
        }

        boardDto.setCreatedAt(timeText);

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

        return boardDto;
    }



}
