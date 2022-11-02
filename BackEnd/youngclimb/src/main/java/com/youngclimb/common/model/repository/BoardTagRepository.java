package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.BoardTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardTagRepository extends JpaRepository<BoardTag, Long> {
}
