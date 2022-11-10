package com.youngclimb.common.util;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.CommentDto;
import com.youngclimb.domain.model.dto.board.CommentPreviewDto;
import com.youngclimb.domain.model.dto.member.CreateMember;
import com.youngclimb.domain.model.dto.member.UserDto;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RequiredArgsConstructor
public class BoardSetter {

    private final BoardMediaRepository boardMediaRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final BoardScrapRepository boardScrapRepository;
    private final CommentRepository commentRepository;
    private final CategoryRepository categoryRepository;
    private final FollowRepository followRepository;
    private final MemberRankExpRepository memberRankExpRepository;

    public BoardDto toBoardDto(BoardScrap scrap, Member member) {

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

        LocalDateTime createdTime = board.getCreatedDateTime();

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
        BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
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
        List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDatetime"));
        if (!comments.isEmpty()) {
            CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                    .nickname(comments.get(0).getMember().getNickname())
                    .comment(comments.get(0).getContent())
                    .build();
            boardDto.setCommentPreview(commentPreviewDto);
        }

        return boardDto;
    }

    // 게시글 DTO 세팅
    BoardDto startDto(Board board, Member member) {
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
    CreateMember toCreateUser(Board board, Member member) {
        Member writer = board.getMember();
        CreateMember createUser = CreateMember.builder()
                .nickname(writer.getNickname())
                .image(writer.getMemberProfileImg())
                .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), member.getMemberId()))
                .build();
        return createUser;
    }

    // 댓글 정보 세팅
    CommentDto toCommentDtos(Comment comment, Member member) {

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
//        commentDto.setIsLiked(commentLikeRepository.existsByCommentAndMember(comment, member));

        return commentDto;
    }

    UserDto setUserDto(Member member) {
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





}
