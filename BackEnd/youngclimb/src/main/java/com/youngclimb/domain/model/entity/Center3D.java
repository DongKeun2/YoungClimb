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
@Table(name = "tb_center_3d")
public class Center3D {
    // 3d 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "3d_id")
    private Integer id;
    // 클라이밍장 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id")
    private Center center;
    // 3d벽 파일 이름
    @Column(name = "3d_path")
    private String path;
    // 3d벽 난이도
    @Column(name = "3d_rank")
    private String rank;
}
