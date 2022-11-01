package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Wall;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WallRepository extends JpaRepository<Wall, Long> {
}
