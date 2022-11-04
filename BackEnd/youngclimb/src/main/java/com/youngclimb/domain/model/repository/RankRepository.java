package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RankRepository extends JpaRepository<Rank, String> {
    Optional<Rank> findByName(String name);
}
