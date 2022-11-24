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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "board_id")
    private Board board;
    // 회원번호
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;
    // 댓글 내용
    @Column(name = "comment_content")
    private String content;
    // 댓글 작성 시간
    @Column(name = "comment_created_datetime")
    private LocalDateTime createdDateTime = LocalDateTime.now();
    // 댓글 부모 번호
    @Column(name = "parent_id")
    private Long parentId;
    // 삭제 여부
    @Column(name = "comment_is_deleted")
    private Boolean isDeleted;

    public void setMemberandBoard(Member member, Board board) {
        this.member = member;
        this.board = board;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }


    public CommentDto toCommentDto() {

        String timeText = "";
        Long minus = ChronoUnit.MINUTES.between(createdDateTime, LocalDateTime.now());

        if (minus <= 10L) {
            timeText = "방금 전";
        } else if (minus <= 60L) {
            timeText = minus + "분 전";
        } else if (minus <= 1440L) {
            timeText = ChronoUnit.HOURS.between(createdDateTime, LocalDateTime.now()) + "시간 전";
        } else if (ChronoUnit.YEARS.between(createdDateTime, LocalDateTime.now()) > 1) {
            timeText = createdDateTime.getMonth().toString() + "월 " + createdDateTime.getDayOfMonth() + "일";
        } else {
            timeText = createdDateTime.getYear() + "년 " + createdDateTime.getMonth().toString() + "월 " + createdDateTime.getDayOfMonth() + "일";
        }

        return CommentDto.builder()
                .id(id)
                .content(content)
                .createdAt(timeText)
                .build();
    }


}
