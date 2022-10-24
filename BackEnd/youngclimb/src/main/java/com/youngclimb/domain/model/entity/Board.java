package com.youngclimb.domain.model.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Board {
    // 글 번호
    private Long id;
    // 회원
    private Member member;
    // 글 본문
    private String content;
    // 작성날짜
    private LocalDateTime createdDateTime = LocalDateTime.now();;
    // 문제 푼 날짜
    private LocalDate solvedDate;
    // 게시글 삭제여부
    private Boolean isDelete;

}
