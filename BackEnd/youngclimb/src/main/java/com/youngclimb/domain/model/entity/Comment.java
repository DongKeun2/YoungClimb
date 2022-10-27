package com.youngclimb.domain.model.entity;

import java.time.LocalDateTime;

public class Comment {
    // 댓글 번호
    private Long id;
    // 글번호
    private Board board;
    // 회원번호
    private Member member;
    // 댓글 내용
    private String content;
    // 댓글 작성 시간
    private LocalDateTime createdDatetime = LocalDateTime.now();
    // 댓글 부모 번호
    private Long parentId;
    // 삭제 여부
    private Boolean idDeleted;



}
