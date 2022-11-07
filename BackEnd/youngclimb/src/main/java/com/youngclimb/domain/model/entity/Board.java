package com.youngclimb.domain.model.entity;

import com.youngclimb.domain.model.dto.board.BoardDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_board")
public class Board {
    // 글 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;
    // 회원
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;
    // 글 본문
    @Column(name = "board_content")
    private String content;
    // 작성날짜
    @Column(name = "board_created_datetime")
    private LocalDateTime createdDateTime = LocalDateTime.now();
    // 문제 푼 날짜
    @Column(name = "board_solved_date")
    private LocalDate solvedDate;
    // 게시글 삭제여부
    @Column(name = "board_is_deleted")
    private Integer isDelete;
    // 게시글 조회수
    @Column(name = "board_view")
    private Long boardView;

    public Board setMember(Member member) {
        this.member = member;
        return this;
    }

    public Board setIsDelete(Integer num) {
        this.isDelete = num;
        return this;
    }

    public BoardDto toBoardDto() {

        String timeText = createdDateTime.getYear() + "년 " + createdDateTime.getMonth() + "월 " + createdDateTime.getDayOfMonth() + "일";
        Long minus = ChronoUnit.MINUTES.between(LocalDateTime.now(), createdDateTime);

        if (minus <= 10L) {
            timeText = "방금 전";
        } else if (minus <= 60L) {
            timeText = minus + "분 전";
        } else if (minus <= 1440L) {
            timeText = ChronoUnit.HOURS.between(LocalDateTime.now(), createdDateTime) + "시간 전";
        } else if (ChronoUnit.YEARS.between(LocalDateTime.now(), createdDateTime) > 1) {
            timeText = createdDateTime.getMonth() + "월 " + createdDateTime.getDayOfMonth() + "일";
        }
//        else {
//            timeText = createdDateTime.getYear() + "년 " + createdDateTime.getMonth() + "월 " + createdDateTime.getDayOfMonth() + "일";
//        }


        return BoardDto.builder()
                .id(boardId)
                .content(content)
                .createdAt(timeText)
                .solvedDate(solvedDate)
                .build();

    }

}
