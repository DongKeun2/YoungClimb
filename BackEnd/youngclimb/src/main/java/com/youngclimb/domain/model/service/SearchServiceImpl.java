package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.BoardSearchDto;
import com.youngclimb.domain.model.dto.member.MemberPic;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import com.youngclimb.domain.model.util.BoardDtoCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    private final MemberRepository memberRepository;
    private final MemberRankExpRepository memberRankExpRepository;
    private final FollowRepository followRepository;
    private final CategoryRepository categoryRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final BoardScrapRepository boardScrapRepository;
    private final CommentRepository commentRepository;
    private final BoardMediaRepository boardMediaRepository;
    private final BoardDtoCreator boardDtoCreator;

    @Override
    public List<MemberPic> getMemberRec(String email) {
        Member user = memberRepository.findByEmail(email).orElseThrow();

        List<Follow> follows = followRepository.findAllByFollower(user);
        List<MemberPic> memberPics = new ArrayList<>();

        for (Follow follow : follows) {
            List<Follow> recommends = followRepository.findAllByFollower(follow.getFollowing());

            for (Follow recommend : recommends) {
                if (Objects.equals(recommend.getFollowing().getMemberId(), user.getMemberId())) continue;
                if (!followRepository.existsByFollowerAndFollowing(user, recommend.getFollowing())) {
                    MemberPic memberPic = MemberPic.builder()
                            .nickname(recommend.getFollowing().getNickname())
                            .image(recommend.getFollowing().getMemberProfileImg())
                            .rank(memberRankExpRepository.findByMember(recommend.getFollowing()).orElseThrow().getRank().getName())
                            .build();


                    memberPics.add(memberPic);
                }
            }
        }
        Set<MemberPic> memberPicSet = new HashSet<>(memberPics);
        List<MemberPic> newMemberPics = new ArrayList<>(memberPicSet);

        if (newMemberPics.isEmpty()) {
            List<Member> similarMembers = memberRepository.findAllByWingheightBetween(user.getWingheight() - 10, user.getWingheight() + 10);

            for (Member similarMember : similarMembers) {
                if (Objects.equals(similarMember.getMemberId(), user.getMemberId())) continue;
                MemberPic memberPic = MemberPic.builder()
                        .nickname(similarMember.getNickname())
                        .image(similarMember.getMemberProfileImg())
                        .rank(memberRankExpRepository.findByMember(similarMember).orElseThrow().getRank().getName())
                        .build();

                newMemberPics.add(memberPic);
            }

        }

        return newMemberPics;
    }

    @Override
    public List<MemberPic> getMemberPic(String nickname) {
        List<Member> members = memberRepository.findAllByNicknameContains(nickname);
        List<MemberPic> memberPics = new ArrayList<>();

        for (Member member : members) {
            MemberPic memberPic = MemberPic.builder()
                    .nickname(member.getNickname())
                    .image(member.getMemberProfileImg())
                    .rank(memberRankExpRepository.findByMember(member).orElseThrow().getRank().getName())
                    .build();

            memberPics.add(memberPic);
        }

        return memberPics;
    }

    @Override
    public List<BoardDto> getBoardPic(BoardSearchDto boardSearchDto, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<BoardDto> boardDtos = new ArrayList<>();
        Integer centerId = boardSearchDto.getCenter();
        Integer wallId = boardSearchDto.getWall();
        Integer levelId = boardSearchDto.getLevel();
        String holdColor = boardSearchDto.getHoldColor();
        boolean isSimilar = boardSearchDto.getIsSimilar();

        List<Category> categories;

        if (wallId == null) {
            if (levelId == null) {
                if (holdColor == "") {
                    categories = categoryRepository.findAllByCenterId(centerId);
                } else {
                    categories = categoryRepository.findAllByCenterIdAndHoldcolor(centerId, holdColor);
                }
            } else {
                if (holdColor == "") {
                    categories = categoryRepository.findAllByCenterIdAndCenterlevelId(centerId, levelId);
                } else {
                    categories = categoryRepository.findAllByCenterIdAndCenterlevelIdAndHoldcolor(centerId, levelId, holdColor);
                }
            }
        } else {
            if (levelId == null) {
                if (holdColor == "") {
                    categories = categoryRepository.findAllByCenterIdAndWallId(centerId, wallId);
                } else {
                    categories = categoryRepository.findAllByCenterIdAndHoldcolorAndWallId(centerId, holdColor, wallId);
                }
            } else {
                if (holdColor == "") {
                    categories = categoryRepository.findAllByCenterIdAndCenterlevelIdAndWallId(centerId, levelId, wallId);
                } else {
                    categories = categoryRepository.findAllByCenterIdAndCenterlevelIdAndHoldcolorAndWallId(centerId, levelId, holdColor, wallId);
                }
            }
        }

        // 나와 비슷한 사람을 보지 않으면 시간 순 정렬, 나와 비슷한 사람을 보고싶으면 비슷한 사람부터
        if (!isSimilar) {
            categories.sort(new Comparator<Category>() {
                @Override
                public int compare(Category o1, Category o2) {
                    return o2.getBoard().getCreatedDateTime().compareTo(o1.getBoard().getCreatedDateTime());
                }
            });
        } else {
            categories.sort(new Comparator<Category>() {
                @Override
                public int compare(Category o1, Category o2) {
                    return (member.getWingheight() - o2.getBoard().getMember().getWingheight()) - (member.getWingheight() - o1.getBoard().getMember().getWingheight());
                }
            });
        }

        for (Category category : categories) {
            Board board = category.getBoard();

            if (board.getIsDelete() != 0) continue;

            BoardDto boardDto = boardDtoCreator.startDto(board, member);
            boardDto.setCreateUser(boardDtoCreator.toCreateUser(board, member));


            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(category.getBoard()).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());


            boardDtos.add(boardDto);
        }

        return boardDtos;
    }
}
