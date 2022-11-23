package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.youngclimb.domain.model.dto.board.*;
import com.youngclimb.domain.model.dto.member.MemberDto;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import com.youngclimb.domain.model.util.BoardDtoCreator;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.cloudfront.domain}")
    private String domain;

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
    private final BoardDtoCreator boardDtoCreator;


    // 2주 이내 팔로워 게시글 읽기
    @Override
    public MainPageDto readRecentBoard(String email, Pageable pageable) {
        // 최종 Dto List
        List<BoardDto> boardDtos = new ArrayList<>();
        MainPageDto mainPageDto = new MainPageDto();

        Member member = memberRepository.findByEmail(email).orElseThrow();
        Slice<Board> recentBoards = boardRepository.findAllByCreatedDateTimeAfterOrderByCreatedDateTimeDesc(LocalDateTime.now().minusWeeks(2), pageable);

        // 2주 이내 게시글
        for (Board board : recentBoards) {
            if (board.getIsDelete() != 0) continue;
            if (reportRepository.existsByBoardAndMember(board, member)) continue;

            // 팔로우 안한 경우 스킵
            if (!followRepository.existsByFollowerAndFollowing(member, board.getMember())) continue;

            // 게시글 Dto 세팅
            BoardDto boardDto = boardDtoCreator.startDto(board, member);
            boardDto.setCreateUser(boardDtoCreator.toCreateUser(board, member));

            // 댓글 DTO 1개 세팅
            List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDateTime"));
            if (!comments.isEmpty()) {
                for (Comment comment : comments) {
                    if (comment.getParentId() == 0) {
                        CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder().nickname(comment.getMember().getNickname()).comment(comment.getContent()).build();
                        boardDto.setCommentPreview(commentPreviewDto);
                        break;
                    }
                }
            }

            // List add
            boardDtos.add(boardDto);

        }

        mainPageDto.setBoardDtos(boardDtos);
        mainPageDto.setNextPage(recentBoards.hasNext());

        return mainPageDto;
    }

    // 메인페이지 추가 게시글
    @Override
    public MainPageDto readAddBoard(String email, Pageable pageable) {
        // 최종 Dto List
        List<BoardDto> boardDtos = new ArrayList<>();
        MainPageDto mainPageDto = new MainPageDto();

        Member member = memberRepository.findByEmail(email).orElseThrow();

        List<Follow> followList = followRepository.findAllByFollower(member);
        List<Member> followMembers = new ArrayList<>();
        followMembers.add(member);

        if (!followList.isEmpty()) {
            for (Follow follow : followList) {
                followMembers.add(memberRepository.findById(follow.getFollowing().getMemberId()).get());
            }
        }

        Slice<Board> recentBoards = boardRepository.findAllByCreatedDateTimeAfterAndMemberNotInOrderByCreatedDateTimeDesc(LocalDateTime.now().minusWeeks(2), followMembers, pageable);

        // 2주 이내 게시글
        for (Board board : recentBoards) {
            // 삭제된 게시글
            if (board.getIsDelete() != 0) continue;
            // 자기가 신고한 게시글
            if (reportRepository.existsByBoardAndMember(board, member)) continue;

            // 게시글 Dto 세팅
            BoardDto boardDto = boardDtoCreator.startDto(board, member);
            boardDto.setCreateUser(boardDtoCreator.toCreateUser(board, member));


            // 댓글 DTO 1개 세팅
            List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDateTime"));
            if (!comments.isEmpty()) {
                for (Comment comment : comments) {
                    if (comment.getParentId() == 0) {
                        CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder().nickname(comment.getMember().getNickname()).comment(comment.getContent()).build();
                        boardDto.setCommentPreview(commentPreviewDto);
                        break;
                    }
                }
            }

            // List add
            boardDtos.add(boardDto);

        }

        mainPageDto.setBoardDtos(boardDtos);
        mainPageDto.setNextPage(recentBoards.hasNext());

        return mainPageDto;
    }

    // 게시글 조회수 증가
    public Long updateView(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        boardRepository.save(board.addView());
        return board.getBoardView();
    }

    // 동영상 저장
    @Override
    public BoardMediaDto saveImage(MultipartFile file) throws InterruptedException {
        if (file != null) {
            String fileName = createFileName(file.getOriginalFilename());
            try (InputStream inputStream = file.getInputStream()) {
                ObjectMetadata objectMetadata = new ObjectMetadata();
                objectMetadata.setContentLength(file.getSize());
                objectMetadata.setContentType(file.getContentType());
                amazonS3.putObject(new PutObjectRequest(bucket + "/boardImg", fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));

            } catch (IOException e) {
                e.printStackTrace();
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
            BoardMediaDto boardMediaDto = new BoardMediaDto();
//            boardMediaDto.setMediaPath(amazonS3.getUrl(bucket + "/boardImg", fileName).toString());
            boardMediaDto.setMediaPath(domain + fileName);
            Thread.sleep(5200);
            boardMediaDto.setThumbnailPath(amazonS3.getUrl(bucket + "/boardThumb", getFileExtension(fileName).concat(".png")).toString());

            return boardMediaDto;
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일이 없습니다.");
        }

    }

    private String createFileName(String fileName) {
//        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
        return UUID.randomUUID().toString().concat(fileName);
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(0, fileName.indexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일입니다");
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
                .wall(wallRepository.findById(boardCreate.getWallId()).orElse(null))
                .centerlevel(centerLevelRepository.findById(boardCreate.getCenterLevelId()).orElseThrow())
                .holdcolor(boardCreate.getHoldColor())
                .difficulty(centerLevelRepository.findById(boardCreate.getCenterLevelId()).orElseThrow().getLevel().getRank())
                .build();
        categoryRepository.save(category);

        // 게시글 동영상 저장
        BoardMedia boardMedia = BoardMedia.builder()
                .board(board)
                .mediaPath(boardCreate.getMediaPath())
                .thumbnailPath(boardCreate.getThumbnailPath())
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
        ranks.sort((o1, o2) -> (int) (o2.getQual() - o1.getQual()));



        for(int i = 1; i<ranks.size(); i++) {
            if ((memberProblem.findSolvedProblem(ranks.get(i).getProblem()) >= 3) && (ranks.get(i).getQual() <= memberExp.getMemberExp())) {
                memberExp.setRank(ranks.get(i-1));
                break;
            }
        }

        memberRankExpRepository.save(memberExp);
    }

    // 게시글 수정하기
    @Override
    public void updateBoard(String email, BoardEdit boardEdit, Long boardId) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        Board board = boardRepository.findById(boardId).orElseThrow();

        if (board.getMember().equals(member)) {
            board.updateContent(boardEdit.getContent());
            boardRepository.save(board);
        }
    }

    // 게시글 삭제하기
    @Override
    public void deleteBoard(String email, Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = board.getMember();
        Category category = categoryRepository.findByBoard(board).orElseThrow();

        // 게시물 삭제
        if (board.getMember().getEmail().equals(email)) {
            board.setIsDelete(1);
            boardRepository.save(board);

            // 유저 경험치 등급 저장하기
            // 게시물에서 등급 받아오기
            Level level = category.getCenterlevel().getLevel();

            // 회원 경험치 업데이트
            MemberRankExp memberExp = memberRankExpRepository.findByMember(member).orElseThrow();
            memberExp.reduceMemberExp(level.getExp());

            // 회원 푼 문제 업데이트
            MemberProblem memberProblem = memberProblemRepository.findByMember(member).orElseThrow();
            memberProblem.reduceProblem(level.getRank());
            memberProblemRepository.save(memberProblem);

            // 랭크 업데이트
            List<Rank> ranks = rankRepository.findAll();
            ranks.sort((o1, o2) -> (int) (o2.getQual() - o1.getQual()));

            for(int i = 1; i<ranks.size(); i++) {
                if ((memberProblem.findSolvedProblem(ranks.get(i).getProblem()) >= 3) && (ranks.get(i).getQual() <= memberExp.getMemberExp())) {
                    memberExp.setRank(ranks.get(i-1));
                    break;
                }
            }
            memberRankExpRepository.save(memberExp);
        }

    }

    // 게시글 좋아요
    @Override
    public BoardLikeDto boardLikeCancle(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();
        BoardLikeDto boardLikeDto = new BoardLikeDto();

        boolean isLike = boardLikeRepository.existsByBoardAndMember(board, member);

        // 이전에 좋아요 누르지 않은 경우
        if (!isLike) {
            BoardLike boardLike = BoardLike.builder().board(board).member(member).build();
            boardLikeRepository.save(boardLike);

            if (board.getMember() != member) {
                Notice noticeBuild = Notice.builder()
                        .type(2)
                        .toMember(board.getMember())
                        .fromMember(member)
                        .board(board)
                        .comment(null)
                        .createdDateTime(LocalDateTime.now())
                        .build();
                noticeRepository.save(noticeBuild);

                // 푸쉬 알림 보내기
                try {
                    if (board.getMember().getFcmToken() != null) {
                        Notification notification = new Notification("", member.getNickname() + "님이 게시물을 좋아합니다.");

                        Message message = Message.builder()
                                .setNotification(notification)
                                .setToken(board.getMember().getFcmToken())
                                .build();

                        FirebaseMessaging.getInstance().send(message);
                    }
                } catch (Exception e) {
                    board.getMember().setFcmToken(null);
                    memberRepository.save(board.getMember());
                }
            }

            boardLikeDto.setIsLike(Boolean.TRUE);
            boardLikeDto.setLike(boardLikeRepository.countByBoard(board));

            return boardLikeDto;
        }
        // 이전에 좋아요 눌렀던 경우
        else {
            if (board.getMember() != member) {
                Notice notice = noticeRepository.findByBoardAndFromMemberAndType(board, member, 2).orElse(null);
                noticeRepository.delete(notice);
            }
            boardLikeRepository.deleteByBoardAndMember(board, member);
//            List<BoardLike> boardLikes = boardLikeRepository.findAllByBoard(board);
            boardLikeDto.setIsLike(Boolean.FALSE);
            boardLikeDto.setLike(boardLikeRepository.countByBoard(board));

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

        BoardDto boardDto = boardDtoCreator.startDto(board, member);
        boardDto.setCreateUser(boardDtoCreator.toCreateUser(board, member));

        boardDetailDto.setBoardDto(boardDto);

        // 댓글 DTO 세팅
        List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDateTime"));
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {
            if (comment.getParentId() == 0) {
                CommentDto commentDto = boardDtoCreator.toCommentDtos(comment, member);

                // 대댓글 세팅
                List<Comment> reComments = commentRepository.findByParentId(comment.getId(), Sort.by(Sort.Direction.ASC, "createdDateTime"));
                List<CommentDto> reCommentDtos = new ArrayList<>();
                for (Comment reComment : reComments) {
                    CommentDto reCommentDto = boardDtoCreator.toCommentDtos(reComment, member);
                    reCommentDtos.add(reCommentDto);
                }

                commentDto.setCommentLikeNum(commentLikeRepository.countByComment(comment));

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
        boolean isLike = commentLikeRepository.existsByCommentAndMember(comment, member);

        if (!isLike) {
            CommentLike commentLike = CommentLike.builder().comment(comment).member(member).build();
            commentLikeRepository.save(commentLike);

            if (comment.getMember() != member) {
                Notice noticeBuild = Notice.builder()
                        .type(4)
                        .toMember(comment.getMember())
                        .fromMember(member)
                        .board(null)
                        .createdDateTime(LocalDateTime.now())
                        .comment(comment)
                        .build();
                noticeRepository.save(noticeBuild);

                // 푸쉬 알림 보내기
                try {
                    if (comment.getMember().getFcmToken() != null) {
                        Notification notification = new Notification("", member.getNickname() + "님이 댓글을 좋아합니다.");

                        Message message = Message.builder()
                                .setNotification(notification)
                                .setToken(comment.getMember().getFcmToken())
                                .build();

                        FirebaseMessaging.getInstance().send(message);
                    }
                } catch (Exception e) {
                    comment.getMember().setFcmToken(null);
                    memberRepository.save(comment.getMember());
                }
            }


            return true;
        } else {
            if (comment.getMember() != member) {
                Notice notice = noticeRepository.findByCommentAndFromMemberAndType(comment, member, 4).orElse(null);
                noticeRepository.delete(notice);
            }

            commentLikeRepository.deleteByCommentAndMember(comment, member);
            return false;
        }

    }

    // 댓글 작성
    @Override
    public void writeComment(CommentCreate commentCreate, Long boardId, String email) {

        // 댓글 저장하기
        Comment comment = commentCreate.toComment();
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        comment.setMemberandBoard(member, board);
        commentRepository.save(comment);

        // 알림 저장하기
        if (board.getMember() != member) {
            Notice noticeBuild = Notice.builder()
                    .type(3)
                    .toMember(board.getMember())
                    .fromMember(member)
                    .board(board)
                    .comment(null)
                    .createdDateTime(LocalDateTime.now())
                    .build();
            noticeRepository.save(noticeBuild);

            // 푸쉬 알림 보내기
            try {
                if (board.getMember().getFcmToken() != null) {
                    Notification notification = new Notification("", member.getNickname() + "님이 게시물에 댓글을 작성하였습니다.");

                    Message message = Message.builder().setNotification(notification).setToken(board.getMember().getFcmToken()).build();

                    FirebaseMessaging.getInstance().send(message);
                }
            } catch (Exception e) {
                board.getMember().setFcmToken(null);
                memberRepository.save(board.getMember());
            }
        }
    }

    // 대댓글 작성
    @Override
    public void writeRecomment(CommentCreate commentCreate, Long boardId, Long commentId, String email) {

        Comment comment = commentCreate.toComment();
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        comment.setMemberandBoard(member, board);
        comment.setParentId(commentId);
        commentRepository.save(comment);

        // 알림 저장하기
        if (comment.getMember() != member) {
            Notice noticeBuild = Notice.builder()
                    .type(5)
                    .toMember(comment.getMember())
                    .fromMember(member)
                    .board(board)
                    .comment(null)
                    .createdDateTime(LocalDateTime.now()).build();

            noticeRepository.save(noticeBuild);

            // 푸쉬 알림 보내기
            try {
                if (comment.getMember().getFcmToken() != null) {
                    Notification notification = new Notification("", member.getNickname() + "님이 대댓글을 작성하였습니다.");

                    Message message = Message.builder().setNotification(notification).setToken(comment.getMember().getFcmToken()).build();

                    FirebaseMessaging.getInstance().send(message);
                }
            } catch (Exception e) {
                comment.getMember().setFcmToken(null);
                memberRepository.save(comment.getMember());
            }
        }
    }

    // 댓글 삭제
    @Override
    public void deleteComment(Long commentId, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        Comment comment = commentRepository.findById(commentId).orElseThrow();

        // 코멘트가 자기 것인 경우 혹은 본인이 쓴 게시글인 경우
        if (comment.getMember() == member || comment.getBoard().getMember() == member ) {

            // 댓글 파트
            // 댓글 좋아요 삭제
            commentLikeRepository.deleteByCommentAndMember(comment, member);
            // 댓글 삭제
            commentRepository.delete(comment);

            // 대댓글 파트
            List<Comment> reComments = commentRepository.findByParentId(commentId, Sort.by(Sort.Direction.ASC, "createdDateTime"));
            List<CommentLike> reCommentLikes = commentLikeRepository.findByCommentIn(reComments);

            if (!reCommentLikes.isEmpty()) {
                for (CommentLike reCommentLike : reCommentLikes) {
                    commentLikeRepository.delete(reCommentLike);
                }
            }


            if (!reComments.isEmpty()) {
                for (Comment reComment : reComments) {
                    commentRepository.delete(reComment);
                }
            }

        }
    }


    // 사용자 정보 조회
    @Override
    public MemberDto getUserInfoByUserId(String userId, String loginEmail) {

        Member member = memberRepository.findByNickname(userId).orElseThrow();
        Member loginMember = memberRepository.findByEmail(loginEmail).orElseThrow();
        MemberDto memberDto = new MemberDto();
        memberDto.setFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(loginMember.getMemberId(), member.getMemberId()));
        memberDto.setUser(boardDtoCreator.setUserDto(member));

        List<Board> boards = boardRepository.findByMember(member, Sort.by(Sort.Direction.DESC, "createdDateTime"));
        List<BoardDto> boardDtos = new ArrayList<>();

        for (Board board : boards) {
            if (board.getIsDelete() != 0) continue;
            // 게시물 Dto 세팅
            BoardDto boardDto = boardDtoCreator.startDto(board, member);
            boardDto.setCreateUser(boardDtoCreator.toCreateUser(board, member));

            // List add
            boardDtos.add(boardDto);
        }
        memberDto.setBoards(boardDtos);

        List<BoardScrap> scraps = boardScrapRepository.findByMember(member, Sort.by(Sort.Direction.DESC, "boardScrapId"));
        List<BoardDto> scrapDtos = new ArrayList<>();

        for (BoardScrap scrap : scraps) {
            Board board = scrap.getBoard();
            if (board.getIsDelete() != 0) continue;
            if (board.getMember() == member) continue;
            if (reportRepository.existsByBoardAndMember(board, member)) continue;

            BoardDto scrapDto = boardDtoCreator.startDto(board, member);
            scrapDto.setCreateUser(boardDtoCreator.toCreateUser(board, member));

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
            BoardScrap boardScrap = BoardScrap.builder().board(board).member(member).build();
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

        Long reportCount = reportRepository.countByBoard(board);

//        List<Report> boardList = reportRepository.findAllByBoard(board);
//        int boardListLength = boardList.size();

        if (board.getMember() == member) {
            return Boolean.FALSE;
        }

        Report report = reportRepository.findByBoardAndMember(board, member).orElse(null);

        if (reportCount >= 9) {
            board.setIsDelete(2);
        }

        if (report == null) {
            Report reportCreate = Report.builder().board(board).member(member).content(content).flag(0).build();

            reportRepository.save(reportCreate);

            return Boolean.TRUE;
        } else {
            return Boolean.FALSE;
        }
    }

}
