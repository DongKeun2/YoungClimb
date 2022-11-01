package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.BoardMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardMediaRepository extends JpaRepository<BoardMedia, Long> {
    Optional<BoardMedia> findByBoard(Board board);

}
