package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankRepository extends JpaRepository<Rank, Long> {
}