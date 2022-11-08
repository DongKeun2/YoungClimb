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
@Table(name = "tb_member_problem")
public class MemberProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_problem_id")
    private Long id;
    // 회원번호
    @OneToOne(fetch = FetchType.EAGER)
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


    // 푼 문제 증가
    public void addVB() {
        this.vB++;
    }

    public void addV0() {
        this.v0++;
    }

    public void addV1() {
        this.v1++;
    }

    public void addV2() {
        this.v2++;
    }

    public void addV3() {
        this.v3++;
    }

    public void addV4() {
        this.v4++;
    }

    public void addV5() {
        this.v5++;
    }

    public void addV6() {
        this.v6++;
    }

    public void addV7() {
        this.v7++;
    }

    public void addV8() {
        this.v8++;
    }

    public void addProblem(String rank) {
        switch (rank) {
            case "VB":
                this.vB++;
                break;
            case "V0":
                this.v0++;
                break;
            case "V1":
                this.v1++;
                break;
            case "V2":
                this.v2++;
                break;
            case "V3":
                this.v3++;
                break;
            case "V4":
                this.v4++;
                break;
            case "V5":
                this.v5++;
                break;
            case "V6":
                this.v6++;
                break;
            case "V7":
                this.v7++;
                break;
            case "V8":
                this.v8++;
                break;
        }
    }

    public Integer findSolvedProblem(String rank) {
        switch (rank) {
            case "VB":
                return this.vB;
            case "V0":
                return this.v0;
            case "V1":
                return this.v1;
            case "V2":
                return this.v2;
            case "V3":
                return this.v3;
            case "V4":
                return this.v4;
            case "V5":
                return this.v5;
            case "V6":
                return this.v6;
            case "V7":
                return this.v7;
            case "V8":
                return this.v8;
            default:
                return 0;
        }
    }


}
