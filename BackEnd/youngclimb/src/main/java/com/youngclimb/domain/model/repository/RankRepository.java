package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RankRepository extends JpaRepository<Rank, Long> {
    Optional<Rank> findByMember(Member member);
}
