package com.youngclimb.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    @ManyToOne(fetch = FetchType.LAZY)
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
    private Boolean isDelete;
    // 게시글 조회수
    @Column(name="board_view")
    private Long boardView;

}
