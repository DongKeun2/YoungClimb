package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.BoardTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardTagRepository extends JpaRepository<BoardTag, Long> {
}
