package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankRepository extends JpaRepository<Rank, Long> {
}
