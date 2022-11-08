package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.BoardSearchDto;
import com.youngclimb.domain.model.dto.board.CommentPreviewDto;
import com.youngclimb.domain.model.dto.member.CreateMember;
import com.youngclimb.domain.model.dto.member.MemberDto;
import com.youngclimb.domain.model.dto.member.MemberPic;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
    private final BoardLikeRepository boardLikeRepository;
    private final BoardScrapRepository boardScrapRepository;
    private final CommentRepository commentRepository;
    private final BoardMediaRepository boardMediaRepository;

    @Override
    public List<MemberPic> getMemberRec(String email) {
        Member user = memberRepository.findByEmail(email).orElseThrow();

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

    @Override
    public List<BoardDto> getBoardPic(BoardSearchDto boardSearchDto, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<BoardDto> boardDtos = new ArrayList<>();
        Integer centerId = boardSearchDto.getCenter();
        Integer wallId = boardSearchDto.getWall();
        Integer levelId = boardSearchDto.getLevel();
        String holdColor = boardSearchDto.getHoldColor();
        boolean isSimilar = boardSearchDto.getIsSimilar();


        List<Category> categories = categoryRepository.findAllByCenterIdAndWallIdAndCenterlevelIdAndHoldColor(centerId, wallId, levelId, holdColor);

        if (!isSimilar) {
            categories.sort(new Comparator<Category>() {
                @Override
                public int compare(Category o1, Category o2) {
                    return o1.getBoard().getCreatedDateTime().compareTo(o2.getBoard().getCreatedDateTime());
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
            // 게시글 DTO 세팅
            BoardDto boardDto = BoardDto.builder()
                    .id(category.getBoard().getBoardId())
                    .solvedDate(category.getBoard().getSolvedDate())
                    .content(category.getBoard().getContent())
                    .like(boardLikeRepository.countByBoard(category.getBoard()))
                    .view(boardScrapRepository.countByBoard(category.getBoard()))
                    .isLiked(boardLikeRepository.existsByBoardAndMember(category.getBoard(), member))
                    .isScrap(boardScrapRepository.existsByBoardAndMember(category.getBoard(), member))
                    .commentNum(commentRepository.countByBoard(category.getBoard()))
                    .build();

            // 작성 유저 정보 세팅
            Member writer = category.getBoard().getMember();
            CreateMember createUser = CreateMember.builder()
                    .nickname(writer.getNickname())
                    .image(writer.getMemberProfileImg())
                    .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                    .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), member.getMemberId()))
                    .build();

            boardDto.setCreateUser(createUser);

            LocalDateTime createdTime = category.getBoard().getCreatedDateTime();

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
            BoardMedia boardMedia = boardMediaRepository.findByBoard(category.getBoard()).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());

            // 카테고리 정보 세팅
//            Category category = categoryRepository.findByBoard(category.getBoard()).orElseThrow();
            boardDto.setCenterId(category.getCenter().getId());
            boardDto.setCenterName(category.getCenter().getName());
            boardDto.setCenterLevelId(category.getCenterlevel().getId());
            boardDto.setCenterLevelColor(category.getCenterlevel().getColor());
            boardDto.setWallId(category.getWall().getId());
            boardDto.setWallName(category.getWall().getName());
            boardDto.setDifficulty(category.getDifficulty());
            boardDto.setHoldColor(category.getHoldColor());


            // 댓글 DTO 1개 세팅
            List<Comment> comments = commentRepository.findAllByBoard(category.getBoard(), Sort.by(Sort.Direction.DESC, "createdDatetime"));
            if (!comments.isEmpty()) {
                CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                        .nickname(comments.get(0).getMember().getNickname())
                        .comment(comments.get(0).getContent())
                        .build();
                boardDto.setCommentPreview(commentPreviewDto);
            }

            boardDtos.add(boardDto);
        }

        return boardDtos;
    }
}
