package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.BoardMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardMediaRepository extends JpaRepository<BoardMedia, Long> {
    List<BoardMedia> findByBoard(Board board);

}
