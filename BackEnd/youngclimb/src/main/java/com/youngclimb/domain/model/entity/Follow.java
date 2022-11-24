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
@Table(name = "tb_follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long id;
    // 팔로우 id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "follower_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member follower;
    // 팔로잉 id
    @ManyToOne
    @JoinColumn(name = "following_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member following;
}
