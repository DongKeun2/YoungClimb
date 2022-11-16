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
@Table(name = "tb_member_rank_exp")
public class MemberRankExp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_rank_exp_id")
    private Long id;
     // 회원번호
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;
    // 등급 이름
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rank_name")
    private Rank rank;
    // 경험치
    @Column(name = "member_EXP")
    private Long memberExp;

    // 경험치 증가
    public void addMemberExp(Long exp) {
        this.memberExp += exp;
    }

    public void reduceMemberExp(Long exp) {
        this.memberExp -= exp;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }
}
