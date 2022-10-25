package com.youngclimb.domain.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "tb_board_like")
public class BoardLike {
    // id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long boardLikeId;
    // 회원번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    // 글번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;
}
