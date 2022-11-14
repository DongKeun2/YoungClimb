package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.MainPageDto;
import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.BoardMedia;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.repository.*;
import com.youngclimb.domain.model.util.BoardDtoCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

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
    private final ReportRepository reportRepository;
    private final BoardDtoCreator boardDtoCreator;

    public MainPageDto serveReels(String email, Pageable pageable) {
        Member user = memberRepository.findByEmail(email).orElseThrow();
        List<BoardDto> boardDtos = new ArrayList<>();
        Integer wingheight = user.getWingheight();

        MainPageDto mainPageDto = new MainPageDto();

        List<Member> similarMembers = memberRepository.findAllByWingheightBetween(wingheight - 10, wingheight + 10);


        similarMembers.sort(new Comparator<Member>() {
            @Override
            public int compare(Member o1, Member o2) {
                return Long.compare(memberRankExpRepository.findByMember(o2).orElseThrow().getMemberExp(), memberRankExpRepository.findByMember(o1).orElseThrow().getMemberExp());
            }
        });


        if (similarMembers.size() > 20) {
            similarMembers = similarMembers.subList(0, 20);
        }

        similarMembers.removeIf(member -> member.getMemberId() == user.getMemberId());

        Slice<Board> boards = boardRepository.findByMemberInOrBoardViewGreaterThan(similarMembers, 100L, pageable);

        for (Board board : boards) {
            if (board.getIsDelete() != 0) continue;
            if (reportRepository.existsByBoardAndMember(board, user)) continue;

            // 게시글 DTO 세팅
            BoardDto boardDto = boardDtoCreator.startDto(board,user);

//            BoardDto boardDto = BoardDto.builder()
//                    .id(board.getBoardId())
//                    .solvedDate(board.getSolvedDate())
//                    .content(board.getContent())
//                    .like(boardLikeRepository.countByBoard(board))
//                    .view(boardScrapRepository.countByBoard(board))
//                    .isLiked(boardLikeRepository.existsByBoardAndMember(board, user))
//                    .isScrap(boardScrapRepository.existsByBoardAndMember(board, user))
//                    .commentNum(commentRepository.countByBoard(board))
//                    .createdDateTime(board.getCreatedDateTime())
//                    .build();

            // 작성 유저 정보 세팅
            boardDto.setCreateUser(boardDtoCreator.toCreateUser(board, user));

//            Member writer = board.getMember();
//            CreateMember createUser = CreateMember.builder()
//                    .nickname(writer.getNickname())
//                    .image(writer.getMemberProfileImg())
//                    .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
//                    .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), user.getMemberId()))
//                    .build();
//
//            boardDto.setCreateUser(createUser);
//
//            LocalDateTime createdTime = board.getCreatedDateTime();
//
//            // 작성날짜 세팅
//            String timeText = createdTime.getYear() + "년 " + createdTime.getMonth().getValue() + "월 " + createdTime.getDayOfMonth() + "일";
//            Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
//            if (minus <= 10) {
//                timeText = "방금 전";
//            } else if (minus <= 60) {
//                timeText = minus + "분 전";
//            } else if (minus <= 1440) {
//                timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
//            } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
//                timeText = createdTime.getMonth().getValue() + "월 " + createdTime.getDayOfMonth() + "일";
//            }
//
//            boardDto.setCreatedAt(timeText);

            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());

//            // 카테고리 정보 세팅
//            Category category = categoryRepository.findByBoard(board).orElseThrow();
//            boardDto.setCenterId(category.getCenter().getId());
//            boardDto.setCenterName(category.getCenter().getName());
//            boardDto.setCenterLevelId(category.getCenterlevel().getId());
//            boardDto.setCenterLevelColor(category.getCenterlevel().getColor());
//            boardDto.setWallId(category.getWall().getId());
//            boardDto.setWallName(category.getWall().getName());
//            boardDto.setDifficulty(category.getDifficulty());
//            boardDto.setHoldColor(category.getHoldcolor());

            // List add
            boardDtos.add(boardDto);
        }


        if (boardDtos.size() > 100) {
            boardDtos = boardDtos.subList(0, 100);
        }

        mainPageDto.setBoardDtos(boardDtos);
        mainPageDto.setNextPage(boards.hasNext());

        return mainPageDto;
    }
}
