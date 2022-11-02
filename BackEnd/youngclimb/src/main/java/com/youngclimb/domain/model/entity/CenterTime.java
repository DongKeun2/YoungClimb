package com.youngclimb.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalTime;
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_center_time")
public class CenterTime {
    // 운영시간 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_id")
    private Integer id;
    // 클라이밍장 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;
    // 요일
    @Column(name = "time_day")
    private Integer day;
    // 시작시간
    @Column(name = "time_start")
    private LocalTime timeStart;
    // 마감시간
    @Column(name = "time_end")
    private LocalTime timeEnd;
}
