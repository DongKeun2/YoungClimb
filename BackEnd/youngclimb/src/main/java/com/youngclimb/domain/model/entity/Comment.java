package com.youngclimb.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
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



}
