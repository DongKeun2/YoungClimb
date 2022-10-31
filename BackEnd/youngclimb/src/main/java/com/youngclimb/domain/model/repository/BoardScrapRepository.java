package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.BoardLike;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardScrapRepository extends JpaRepository<BoardLike, Long> {
    Long countByBoard(Board board);

    Optional<BoardLike> findByBoardAndMember(Board board, Member member);

    Boolean existsByBoardAndMember(Board board, Member member);
}
