package com.youngclimb.domain.model.entity;

public class Notice {
    // 신고 번호
    private Long id;
    // 회원 번호
    private Member member;
    // 글 번호
    private Board board;
    // 신고 내용
    private String content;
    // 신고 처리 여부
    private Integer flag;
}
