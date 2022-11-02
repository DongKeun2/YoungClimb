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
@Table(name = "tb_category")
public class Category {
    //카테고리 id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    // 글
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;
    // 클라이밍장 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;
    // 벽 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wall_id")
    private Wall wall;
    // 클라이밍장 난이도 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="center_level_id")
    private CenterLevel centerlevel;
    // 홀드 색깔
    @Column(name = "category_hold_color")
    private String holdColor;
    // 규정 난이도
    @Column(name = "category_difficulty")
    private String difficulty;

}
