package com.youngclimb.domain.model.entity;

public class MemberLog {
    // 로그 번호
    private Long id;
    // 신고 번호
    private Notice notice;
    // 회원 번호
    private Member member;
    // 글 번호
    private Board board;
    // 경험치
    private Integer logExp;
    // 로그 내용
    private String content;
}
