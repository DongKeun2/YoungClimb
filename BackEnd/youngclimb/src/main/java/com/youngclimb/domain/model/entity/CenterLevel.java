package com.youngclimb.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_center_level")
public class CenterLevel {
    // 클라이밍장 난이도 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "center_level_id")
    private Integer id;
    // 클라이밍장 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private  Center center;
    // 규정 난이도
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "level_rank")
    private Level level;
    // 난이도 색깔
    @Column(name = "center_level_color")
    private String color;

}
