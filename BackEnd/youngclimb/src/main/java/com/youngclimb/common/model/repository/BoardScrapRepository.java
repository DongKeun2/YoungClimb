package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Board;
import com.youngclimb.common.model.entity.BoardLike;
import com.youngclimb.common.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardScrapRepository extends JpaRepository<BoardLike, Long> {
    Long countByBoard(Board board);

    Optional<BoardLike> findByBoardAndMember(Board board, Member member);

    Boolean existsByBoardAndMember(Board board, Member member);
}
