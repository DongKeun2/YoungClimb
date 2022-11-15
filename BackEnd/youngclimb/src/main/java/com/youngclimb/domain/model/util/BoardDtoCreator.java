package com.youngclimb.domain.model.util;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.CommentDto;
import com.youngclimb.domain.model.dto.member.CreateMember;
import com.youngclimb.domain.model.dto.member.UserDto;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
public class BoardDtoCreator {
    private final BoardRepository boardRepository;
    private final BoardScrapRepository boardScrapRepository;
    private final CategoryRepository categoryRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final CommentRepository commentRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final MemberRankExpRepository memberRankExpRepository;
    private final FollowRepository followRepository;
    private final BoardMediaRepository boardMediaRepository;

    // 게시글 DTO 세팅
    public BoardDto startDto(Board board, Member member) {
        // 게시글 DTO 초기화
        BoardDto boardDto = createBoardDto(board, member);

        // 작성날짜 세팅
        LocalDateTime createdTime = board.getCreatedDateTime();
        boardDto.setCreatedAt(createdDate(createdTime));

        // 게시글 미디어 path 세팅
        BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
        boardDto.setMediaPath(boardMedia.getMediaPath());

        // 카테고리 정보 세팅
        Category category = categoryRepository.findByBoard(board).orElseThrow();
        setCategoryBoard(boardDto, category);

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

    // 댓글 Dto 만들기
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

        // 작성날짜 세팅
        LocalDateTime createdTime = comment.getCreatedDateTime();
        commentDto.setCreatedAt(createdDate(createdTime));

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

    // 작성일 세팅
    public String createdDate(LocalDateTime createdTime) {
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
        return timeText;
    }

    // 게시글 Dto 만들기
    public BoardDto createBoardDto(Board board, Member member) {
        return BoardDto.builder()
                .id(board.getBoardId())
                .solvedDate(board.getSolvedDate())
                .content(board.getContent())
                .like(boardLikeRepository.countByBoard(board))
                .view(board.getBoardView())
                .isLiked(boardLikeRepository.existsByBoardAndMember(board, member))
                .isScrap(boardScrapRepository.existsByBoardAndMember(board, member))
                .commentNum(commentRepository.countByBoard(board))
                .build();
    }

    // 카테고리 정보 세팅
    public void setCategoryBoard(BoardDto boardDto, Category category) {
        boardDto.setCenterId(category.getCenter().getId());
        boardDto.setCenterName(category.getCenter().getName());
        boardDto.setCenterLevelId(category.getCenterlevel().getId());
        boardDto.setCenterLevelColor(category.getCenterlevel().getColor());
        if(category.getWall() != null ) {
        boardDto.setWallId(category.getWall().getId());
        boardDto.setWallName(category.getWall().getName()); }
        else {
            boardDto.setWallId(null);
            boardDto.setWallName(null);
        }
        boardDto.setDifficulty(category.getDifficulty());
        boardDto.setHoldColor(category.getHoldcolor());
    }

}
