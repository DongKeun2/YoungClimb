package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Follow;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Boolean existsByFollowerAndFollowing(Member follower, Member following);

    Boolean existsByFollowerMemberIdAndFollowingMemberId(Long followerId, Long followingId);

}
