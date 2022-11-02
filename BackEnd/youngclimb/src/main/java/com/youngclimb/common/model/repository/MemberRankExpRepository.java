package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Member;
import com.youngclimb.common.model.entity.MemberRankExp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRankExpRepository extends JpaRepository<MemberRankExp, Long> {
    Optional<MemberRankExp> findByMember(Member member);
}
