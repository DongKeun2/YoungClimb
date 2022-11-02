package com.youngclimb.common.model.entity;

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
@Table(name = "tb_member_problem")
public class MemberProblem {
    // 회원번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_problem_id")
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    // 난이도 0
    @Column(name = "VB")
    private Integer vB;
    // 난이도 1
    @Column(name = "V0")
    private Integer v0;
    // 난이도 2
    @Column(name = "V1")
    private Integer v1;
    // 난이도 3
    @Column(name = "V2")
    private Integer v2;
    // 난이도 4
    @Column(name = "V3")
    private Integer v3;
    // 난이도 5
    @Column(name = "V4")
    private Integer v4;
    // 난이도 6
    @Column(name = "V5")
    private Integer v5;
    // 난이도 7
    @Column(name = "V6")
    private Integer v6;
    // 난이도 8
    @Column(name = "V7")
    private Integer v7;
    // 난이도 9
    @Column(name = "V8")
    private Integer v8;
}
