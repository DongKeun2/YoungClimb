package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.youngclimb.domain.model.dto.board.*;
import com.youngclimb.domain.model.dto.member.CreateMember;
import com.youngclimb.domain.model.dto.member.MemberDto;
import com.youngclimb.domain.model.dto.member.UserDto;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
    private final NoticeRepository noticeRepository;
    private final AmazonS3 amazonS3;


    // 게시글 읽기
    @Override
    public List<BoardDto> readAllBoard(String email, Pageable pageable) {
        // 최종 Dto List
        List<BoardDto> boardDtos = new ArrayList<>();

        Member member = memberRepository.findByEmail(email).orElseThrow();
        Slice<Board> recentBoards = boardRepository.findAllByCreatedDateTimeAfterOrderByCreatedDateTimeDesc(LocalDateTime.now().minusWeeks(2), pageable);
        Slice<Board> oldBoards = boardRepository.findAllByCreatedDateTimeBeforeOrderByCreatedDateTimeDesc(LocalDateTime.now().minusWeeks(2), pageable);

        List<BoardDto> recentFollowrBoardDtos = new ArrayList<>();
        List<BoardDto> recentOtherBoardDtos = new ArrayList<>();

//        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDateTime"));



        // 2주 이내 게시글
        for (Board board : recentBoards) {
            if (board.getIsDelete() != 0) continue;
            if (reportRepository.existsByBoardAndMember(board, member)) continue;

            // 팔로우한 경우
            if (followRepository.existsByFollowerAndFollowing(member, board.getMember())) {

                // 게시글 Dto 세팅
                BoardDto boardDto = this.startDto(board, member);
                boardDto.setCreateUser(this.toCreateUser(board, member));

                // 댓글 DTO 1개 세팅
                List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
                if (!comments.isEmpty()) {
                    for(Comment comment : comments) {
                        if(comment.getParentId() == 0) {
                            CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                                    .nickname(comment.getMember().getNickname())
                                    .comment(comment.getContent())
                                    .build();
                            boardDto.setCommentPreview(commentPreviewDto);
                            break;
                        }
                    }
                }

                // List add
                recentFollowrBoardDtos.add(boardDto);
            }
            // 팔로우하지 않은 경우
            else {
                System.out.println("여기가 문제야");
                System.out.println(board.getMember().getNickname());
                if (board.getMember() == member) continue;
                System.out.println("저기가 문제야");
                // 게시글 Dto 세팅
                BoardDto boardDto = this.startDto(board, member);
                boardDto.setCreateUser(this.toCreateUser(board, member));

                // 댓글 DTO 1개 세팅
                List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
                if (!comments.isEmpty()) {
                    for(Comment comment : comments) {
                        if(comment.getParentId() == 0) {
                            CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                                    .nickname(comment.getMember().getNickname())
                                    .comment(comment.getContent())
                                    .build();
                            boardDto.setCommentPreview(commentPreviewDto);
                            break;
                        }
                    }
                }

                // List add
                recentOtherBoardDtos.add(boardDto);
            }
        }

        boardDtos.addAll(recentFollowrBoardDtos);
        boardDtos.addAll(recentOtherBoardDtos);

        // 2주 이후 게시글

        for (Board board : oldBoards) {
            if (board.getIsDelete() != 0) continue;
            if (board.getMember() == member) continue;
            if (reportRepository.existsByBoardAndMember(board, member)) continue;

            // 게시글 Dto 세팅
            BoardDto boardDto = this.startDto(board, member);
            boardDto.setCreateUser(this.toCreateUser(board, member));
            BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());

            // 댓글 DTO 1개 세팅
            List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
            if (!comments.isEmpty()) {
                for(Comment comment : comments) {
                    if(comment.getParentId() == 0) {
                        CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                                .nickname(comment.getMember().getNickname())
                                .comment(comment.getContent())
                                .build();
                        boardDto.setCommentPreview(commentPreviewDto);
                        break;
                    }
                }
            }
            // List add
            recentOtherBoardDtos.add(boardDto);
        }
        return boardDtos;
    }

    // 게시글 상세정보
    @Override
    public BoardDto readBoardDetail(Long boardId, String email) {

        Member member = memberRepository.findByEmail(email).orElseThrow();
        Board board = boardRepository.findById(boardId).orElseThrow();


        // 게시글 DTO 세팅
        BoardDto boardDto = BoardDto.builder()
                .id(board.getBoardId())
                .solvedDate(board.getSolvedDate())
                .content(board.getContent())
                .like(boardLikeRepository.countByBoard(board))
                .view(board.getBoardView())
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
        boardDto.setHoldColor(category.getHoldcolor());


        // 댓글 DTO 1개 세팅
        List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
        if (!comments.isEmpty()) {
            for(Comment comment : comments) {
                if(comment.getParentId() == 0) {
                    CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                            .nickname(comment.getMember().getNickname())
                            .comment(comment.getContent())
                            .build();
                    boardDto.setCommentPreview(commentPreviewDto);
                    break;
                }
            }
        }


        return boardDto;
    }

    // 동영상 저장
    @Override
    public String saveImage(MultipartFile file) {
        if (file != null) {
            System.out.println(file.getContentType());

            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            System.out.println(file.getSize());
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            System.out.println("여기까진 되고");
            try (InputStream inputStream = file.getInputStream()) {
                System.out.println("이거 보내지나?");
                amazonS3.putObject(new PutObjectRequest(bucket + "/boardImg", fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                System.out.println("파일 변환 실패");
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
            return amazonS3.getUrl(bucket + "/boardImg", fileName).toString();
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일이 없습니다.");
        }

    }

    // 게시글 작성
    @Override
    public void writeBoard(String email, BoardCreate boardCreate) {

        // 게시글 저장하기
        Board board = boardCreate.toBoard();
        Member member = memberRepository.findByEmail(email).orElseThrow();
        board.setMember(member);
        boardRepository.save(board);

        // 카테고리 저장하기
        Category category = Category.builder()
                .board(board)
                .center(centerRepository.findById(boardCreate.getCenterId()).orElseThrow())
                .wall(wallRepository.findById(boardCreate.getWallId()).orElse(new Wall()))
                .centerlevel(centerLevelRepository.findById(boardCreate.getCenterLevelId()).orElseThrow())
                .holdcolor(boardCreate.getHoldColor())
                .difficulty(centerLevelRepository.findById(boardCreate.getCenterLevelId()).orElseThrow().getLevel().getRank())
                .build();
        categoryRepository.save(category);

//        // 이미지 저장하기
//        if (!file.isEmpty()) {
//            String fileName = createFileName(file.getOriginalFilename());
//            ObjectMetadata objectMetadata = new ObjectMetadata();
//            objectMetadata.setContentLength(file.getSize());
//            objectMetadata.setContentType(file.getContentType());
//            try (InputStream inputStream = file.getInputStream()) {
//                amazonS3.putObject(new PutObjectRequest(bucket + "/boardImg", fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
//            } catch (IOException e) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
//            }
//            BoardMedia boardMedia = BoardMedia.builder().board(board).mediaPath(amazonS3.getUrl(bucket + "/boardImg", fileName).toString())
//                    .build();
//            boardMediaRepository.save(boardMedia);
//        }

        BoardMedia boardMedia = BoardMedia.builder()
                .board(board).mediaPath(boardCreate.getMediaPath())
                .build();

        boardMediaRepository.save(boardMedia);

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

    // 게시글 삭제하기
    @Override
    public void deleteBoard(String email, Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow();

        if (board.getMember().getEmail() == email) {
            board.setIsDelete(1);
            boardRepository.save(board);
        }

    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            System.out.println(fileName);
            System.out.println(fileName.indexOf("."));
            return fileName.substring(0, fileName.indexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일입니다");
        }
    }

    // 게시글 좋아요
    @Override
    public BoardLikeDto boardLikeCancle(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();
        BoardLikeDto boardLikeDto = new BoardLikeDto();
        Notice notice = noticeRepository.findByToMemberAndFromMemberAndType(board.getMember(), member, 2).orElse(null);

        boolean isLike = boardLikeRepository.existsByBoardAndMember(board, member);

        if (!isLike) {
            BoardLike boardLike = BoardLike.builder()
                    .board(board)
                    .member(member)
                    .build();
            boardLikeRepository.save(boardLike);

            if (board.getMember() != member) {
                Notice noticeBuild = Notice.builder()
                        .type(2)
                        .toMember(board.getMember())
                        .fromMember(member)
                        .board(board)
                        .createdDateTime(LocalDateTime.now())
                        .build();
                noticeRepository.save(noticeBuild);
            }

            List<BoardLike> boardLikes = boardLikeRepository.findAllByBoard(board);
            boardLikeDto.setIsLike(Boolean.TRUE);
            boardLikeDto.setLike(boardLikes.size());

            // 푸쉬 알림 보내기
            try {
                if (board.getMember().getFcmToken() != null) {
                    Notification notification = new Notification("",
                            member.getNickname() + "님이 게시물을 좋아합니다.");

                    Message message = Message.builder()
                            .setNotification(notification)
                            .setToken(board.getMember().getFcmToken())
                            .build();

                    FirebaseMessaging.getInstance().send(message);
                }
            } catch (Exception e){
                board.getMember().setFcmToken(null);
                memberRepository.save(board.getMember());
            }

            return boardLikeDto;
        } else {
            if (board.getMember() != member) {
                noticeRepository.delete(notice);
            }
            boardLikeRepository.deleteByBoardAndMember(board, member);
            List<BoardLike> boardLikes = boardLikeRepository.findAllByBoard(board);
            boardLikeDto.setIsLike(Boolean.FALSE);
            boardLikeDto.setLike(boardLikes.size());
            return boardLikeDto;
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
            if(comment.getParentId() == 0) {
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
        }
        boardDetailDto.setCommentDtos(commentDtos);

        return boardDetailDto;
    }

    // 댓글 좋아요
    @Override
    public Boolean commentLikeCancle(Long commentId, String email) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();
        Notice notice = noticeRepository.findByToMemberAndFromMemberAndType(comment.getMember(), member,4).orElse(null);

        boolean isLike = commentLikeRepository.existsByCommentAndMember(comment, member);

        if (!isLike) {
            CommentLike commentLike = CommentLike.builder()
                    .comment(comment)
                    .member(member)
                    .build();

            commentLikeRepository.save(commentLike);

            if (comment.getMember() != member) {
                Notice noticeBuild = Notice.builder()
                        .type(4)
                        .toMember(comment.getMember())
                        .fromMember(member)
                        .board(comment.getBoard())
                        .createdDateTime(LocalDateTime.now())
                        .build();
                noticeRepository.save(noticeBuild);
            }

            // 푸쉬 알림 보내기
            try {
                if (comment.getMember().getFcmToken() != null) {
                    Notification notification = new Notification("",
                            member.getNickname() + "님이 댓글을 좋아합니다.");

                    Message message = Message.builder()
                            .setNotification(notification)
                            .setToken(comment.getMember().getFcmToken())
                            .build();

                    FirebaseMessaging.getInstance().send(message);
                }
            } catch (Exception e){
                comment.getMember().setFcmToken(null);
                memberRepository.save(comment.getMember());
            }
            return true;
        } else {

            if (comment.getMember() != member) {
                noticeRepository.delete(notice);
            }

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

        // 알림 저장하기
        if (board.getMember() != member) {
            Notice noticeBuild = Notice.builder()
                    .type(3)
                    .toMember(board.getMember())
                    .fromMember(member)
                    .board(board)
                    .createdDateTime(LocalDateTime.now())
                    .build();
            noticeRepository.save(noticeBuild);
        }

        // 푸쉬 알림 보내기
        try {
            if (board.getMember().getFcmToken() != null) {
                Notification notification = new Notification("",
                        member.getNickname() + "님이 게시물에 댓글을 작성하였습니다.");

                Message message = Message.builder()
                        .setNotification(notification)
                        .setToken(board.getMember().getFcmToken())
                        .build();

                FirebaseMessaging.getInstance().send(message);
            }
        } catch (Exception e){
            board.getMember().setFcmToken(null);
            memberRepository.save(board.getMember());
        }

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

        // 알림 저장하기
        if (comment.getMember() != member) {
            Notice noticeBuild = Notice.builder()
                    .type(5)
                    .toMember(comment.getMember())
                    .fromMember(member)
                    .board(board)
                    .createdDateTime(LocalDateTime.now())
                    .build();
            noticeRepository.save(noticeBuild);
        }

        // 푸쉬 알림 보내기
        try {
            if (comment.getMember().getFcmToken() != null) {
                Notification notification = new Notification("",
                        member.getNickname() + "님이 대댓글을 작성하였습니다.");

                Message message = Message.builder()
                        .setNotification(notification)
                        .setToken(comment.getMember().getFcmToken())
                        .build();

                FirebaseMessaging.getInstance().send(message);
            }
        } catch (Exception e){
            comment.getMember().setFcmToken(null);
            memberRepository.save(comment.getMember());
        }


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
            if (board.getIsDelete() != 0) continue;
            // 게시물 Dto 세팅
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
            if (scrap.getBoard().getIsDelete() != 0) continue;
            if (scrap.getBoard().getMember() == member) continue;
            if (reportRepository.existsByBoardAndMember(scrap.getBoard(), member)) continue;

            BoardDto scrapDto = this.startScrapDto(scrap, member);
            scrapDto.setCreateUser(this.toCreateScrapUser(scrap, member));

            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(scrap.getBoard()).orElseThrow();
            scrapDto.setMediaPath(boardMedia.getMediaPath());

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
    public Boolean boardReport(Long boardId, Integer content, String email) {
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
                .view(board.getBoardView())
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
        System.out.println(createdTime);
        System.out.println(LocalDateTime.now());
        System.out.println(minus);
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
        boardDto.setHoldColor(category.getHoldcolor());

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

    // 스크랩한 글 보여주기
    public BoardDto startScrapDto(BoardScrap scrap, Member member) {
        // 게시글 DTO 세팅
        BoardDto scrapDto = BoardDto.builder()
                .id(scrap.getBoard().getBoardId())
                .solvedDate(scrap.getBoard().getSolvedDate())
                .content(scrap.getBoard().getContent())
                .like(boardLikeRepository.countByBoard(scrap.getBoard()))
                .view(scrap.getBoard().getBoardView())
                .isLiked(boardLikeRepository.existsByBoardAndMember(scrap.getBoard(), member))
                .isScrap(boardScrapRepository.existsByBoardAndMember(scrap.getBoard(), member))
                .commentNum(commentRepository.countByBoard(scrap.getBoard()))
                .build();

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
        scrapDto.setHoldColor(category.getHoldcolor());

        return scrapDto;
    }

    // 스크랩한 글 작성자 정보
    // 작성 유저 정보 세팅
    public CreateMember toCreateScrapUser(BoardScrap scrap, Member member) {
        // 작성 유저 정보 세팅
        Member writer = scrap.getBoard().getMember();
        CreateMember createUser = CreateMember.builder()
                .nickname(writer.getNickname())
                .image(writer.getMemberProfileImg())
                .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), member.getMemberId()))
                .build();
        return createUser;
    }


}
