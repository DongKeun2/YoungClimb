package com.youngclimb.domain.model.entity;

import java.time.LocalDate;

public class CenterEvent {
    // 이벤트 번호
    private Integer id;
    // 클라이밍장 번호
    private Center center;
    // 이벤트 날짜
    private LocalDate date;
    // 이벤트 내용
    private String content;
}
