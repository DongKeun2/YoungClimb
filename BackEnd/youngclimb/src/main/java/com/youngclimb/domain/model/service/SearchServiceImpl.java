package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.BoardSearchDto;
import com.youngclimb.domain.model.dto.member.MemberDto;
import com.youngclimb.domain.model.dto.member.MemberPic;
import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.Category;
import com.youngclimb.domain.model.entity.Follow;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.repository.CategoryRepository;
import com.youngclimb.domain.model.repository.FollowRepository;
import com.youngclimb.domain.model.repository.MemberRankExpRepository;
import com.youngclimb.domain.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {
    private final MemberRepository memberRepository;
    private final MemberRankExpRepository memberRankExpRepository;
    private final FollowRepository followRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<MemberPic> getMemberRec() {
        String name = "김싸피";
        Member user = memberRepository.findByNickname(name).orElseThrow();

        List<Follow> follows = followRepository.findByFollower(user);
        List<MemberPic> memberPics = new ArrayList<>();

        for (Follow follow : follows) {
            List<Follow> recommends = followRepository.findByFollower(follow.getFollowing());

            for (Follow recommend : recommends) {
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

        return memberPics;
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

//    @Override
//    public List<BoardDto> getBoardPic(BoardSearchDto boardSearchDto) {
//        List<BoardDto> boardDtos = new ArrayList<>();
//        Integer centerId = boardSearchDto.getCenter();
//        Integer wallId = boardSearchDto.getWall();
//        Integer levelId = boardSearchDto.getLevel();
//        String holdColor = boardSearchDto.getHoldColor();
//        boolean isSimilar = boardSearchDto.getIsSimilar();
//
//
//        List<Category> categories = categoryRepository.findAllByCenterIdAndWallIdAndCenterLevelIdAndHoldColor(centerId, wallId, levelId, holdColor);
//
//        if (!isSimilar) {
//            categories.sort(new Comparator<Category>() {
//                @Override
//                public int compare(Category o1, Category o2) {
//                    return o1.getBoard().getCreatedDateTime().compareTo(o2.getBoard().getCreatedDateTime());
//                }
//            });
//        } else {
//            categories.sort(new Comparator<Category>() {
//                @Override
//                public int compare(Category o1, Category o2) {
//                    return o1.getBoard().getMember();
//                }
//            });
//        }
//
//
//        return boardDtos;
//    }
}
