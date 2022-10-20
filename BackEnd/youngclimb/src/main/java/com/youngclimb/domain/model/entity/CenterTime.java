package com.youngclimb.domain.model.entity;

import java.time.LocalDate;
import java.time.LocalTime;

public class CenterTime {
    // 운영시간 번호
    private Integer id;
    // 클라이밍장 번호
    private Center center;
    // 요일
    private Integer day;
    // 시작시간
    private LocalTime timeStart;
    // 마감시간
    private LocalTime timeEnd;
}
