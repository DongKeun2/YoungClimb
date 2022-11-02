package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Follow;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.entity.MemberRankExp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Boolean existsByFollowerAndFollowing(Member follower, Member following);

    Boolean existsByFollowerMemberIdAndFollowingMemberId(Long followerId, Long followingId);

    Optional<Follow> findByFollowerAndFollowing(Member follower,Member following);
    Optional<Follow> findByFollowing(Member member);

    Optional<Follow> findByFollower(Member member);

    Long countByFollowing(Member member);
    Long countByFollower(Member member);

    void delete(Follow follow);

}
