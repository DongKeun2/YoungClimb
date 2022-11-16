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
            BoardDto boardDto = boardDtoCreator.startDto(board, user);

            // 작성 유저 정보 세팅
            boardDto.setCreateUser(boardDtoCreator.toCreateUser(board, user));

            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());

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
