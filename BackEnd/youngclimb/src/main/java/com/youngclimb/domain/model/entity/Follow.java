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
    @ManyToOne
    @JoinColumn(name = "follower_id", insertable = false, updatable = false)
    Member follower;
    // 팔로잉 id
    @ManyToOne
    @JoinColumn(name = "following_id", insertable = false, updatable = false)
    Member following;

    public Follow setFollowing(Member following) {
        this.following = following;
        return this;
    }

    public Follow setFollower(Member follower) {
        this.follower = follower;
        return this;
    }

    public Follow(Member follower, Member following) {
        this.follower = follower;
        this.following = following;
    }
}
