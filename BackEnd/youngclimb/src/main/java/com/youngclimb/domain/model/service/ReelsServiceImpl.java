package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.CommentPreviewDto;
import com.youngclimb.domain.model.dto.center.CenterDto;
import com.youngclimb.domain.model.dto.member.CreateMember;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReelsServiceImpl implements ReelsService {
    private final MemberRepository memberRepository;
    private final MemberRankExpRepository memberRankExpRepository;
    private final BoardRepository boardRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final BoardScrapRepository boardScrapRepository;
    private final CommentRepository commentRepository;
    private final FollowRepository followRepository;
    private final BoardMediaRepository boardMediaRepository;
    private final CategoryRepository categoryRepository;

    public List<BoardDto> serveReels(String email, Pageable pageable) {
        Member user = memberRepository.findByEmail(email).orElseThrow();
        List<BoardDto> boardDtos = new ArrayList<>();
        Integer wingheight = user.getWingheight();

        List<Member> similarMembers = memberRepository.findAllByWingheightBetween(wingheight - 10, wingheight + 10);
        similarMembers.remove(user);

        similarMembers.sort(new Comparator<Member>() {
            @Override
            public int compare(Member o1, Member o2) {
                return Long.compare(memberRankExpRepository.findByMember(o2).orElseThrow().getMemberExp(), memberRankExpRepository.findByMember(o1).orElseThrow().getMemberExp());
            }
        });

        List<Member> members = new ArrayList<>();

        if (similarMembers.size() > 20) {
            members = similarMembers.subList(0,20);
        } else {
            members = similarMembers;
        }



        for (Member member : members) {
            List<Board> boards = boardRepository.findByMember(member, Sort.by(Sort.Direction.DESC, "createdDateTime"));
            System.out.println("됐다");
            System.out.println(member.getMemberId());

            if (boards.isEmpty()) {
                System.out.println("과연?");
                continue;
            }

                for (Board board : boards) {

                    // 게시글 DTO 세팅
                    BoardDto boardDto = BoardDto.builder()
                            .id(board.getBoardId())
                            .solvedDate(board.getSolvedDate())
                            .content(board.getContent())
                            .like(boardLikeRepository.countByBoard(board))
                            .view(boardScrapRepository.countByBoard(board))
                        .isLiked(boardLikeRepository.existsByBoardAndMember(board, user))
                        .isScrap(boardScrapRepository.existsByBoardAndMember(board, user))
                        .commentNum(commentRepository.countByBoard(board))
                        .build();

                // 작성 유저 정보 세팅
                Member writer = board.getMember();
                CreateMember createUser = CreateMember.builder()
                        .nickname(writer.getNickname())
                        .image(writer.getMemberProfileImg())
                        .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                        .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), user.getMemberId()))
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

        }


        if (boardDtos.size() > 60) {
            boardDtos = boardDtos.subList(0,60);
        }

        System.out.println("여기는?");

        List<Board> popularBoards = boardRepository.findByBoardViewGreaterThanOrderByBoardViewDesc(100L);

        System.out.println("어디서 막히니..");
        for (Board board : popularBoards) {
            // 게시글 DTO 세팅
            BoardDto boardDto = BoardDto.builder()
                    .id(board.getBoardId())
                    .solvedDate(board.getSolvedDate())
                    .content(board.getContent())
                    .like(boardLikeRepository.countByBoard(board))
                    .view(boardScrapRepository.countByBoard(board))
                    .isLiked(boardLikeRepository.existsByBoardAndMember(board, user))
                    .isScrap(boardScrapRepository.existsByBoardAndMember(board, user))
                    .commentNum(commentRepository.countByBoard(board))
                    .build();

            // 작성 유저 정보 세팅
            Member writer = board.getMember();
            CreateMember createUser = CreateMember.builder()
                    .nickname(writer.getNickname())
                    .image(writer.getMemberProfileImg())
                    .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                    .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), user.getMemberId()))
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

        if (boardDtos.size() > 100) {
            boardDtos = boardDtos.subList(0,100);
        }

        return boardDtos;
    }
}
