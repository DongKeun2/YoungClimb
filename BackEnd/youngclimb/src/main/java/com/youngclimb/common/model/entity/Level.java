package com.youngclimb.common.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_level")
public class Level {
    // 규정난이도
    @Id
    @Column(name = "level_rank")
    private String rank;
    // 경험치
    @Column(name = "level_exp")
    private Long exp;
}
