package com.youngclimb.domain.model.entity;

import com.youngclimb.domain.model.dto.board.CommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_comment")
public class Comment {
    // 댓글 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;
    // 글번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;
    // 회원번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    // 댓글 내용
    @Column(name = "comment_content")
    private String content;
    // 댓글 작성 시간
    @Column(name = "comment_created_datetime")
    private LocalDateTime createdDatetime = LocalDateTime.now();
    // 댓글 부모 번호
    @Column(name = "parent_id")
    private Long parentId;
    // 삭제 여부
    @Column(name = "comment_is_deleted")
    private Boolean isDeleted;

    public Comment setMember(Member member) {
        this.member = member;
        return this;
    }

    public Comment setBoard(Board board) {
        this.board = board;
        return this;
    }


    public CommentDto toCommentDto() {

        String timeText = "";
        Long minus = ChronoUnit.MINUTES.between(createdDatetime, LocalDateTime.now());

        if (minus <= 10L) {
            timeText = "방금 전";
        } else if (minus <= 60L) {
            timeText = minus + "분 전";
        } else if (minus <= 1440L) {
            timeText = ChronoUnit.HOURS.between(createdDatetime, LocalDateTime.now()) + "시간 전";
        } else if (ChronoUnit.YEARS.between(createdDatetime, LocalDateTime.now()) > 1) {
            timeText = createdDatetime.getMonth() + "월 " + createdDatetime.getDayOfMonth() + "일";
        } else {
            timeText = createdDatetime.getYear() + "년 " + createdDatetime.getMonth() + "월 " + createdDatetime.getDayOfMonth() + "일";
        }

        return CommentDto.builder()
                .id(id)
                .content(content)
                .createdAt(timeText)
                .build();
    }


}
