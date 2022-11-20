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
@Table(name = "tb_rank")
public class Rank {
    // 등급 이름
    @Id
    @Column(name = "rank_name")
    private String name;
    // 등급 조건
    @Column(name = "rank_qual")
    private Long qual;
    // 등급 문제 조건
    @Column(name = "rank_problem")
    private String problem;
}
