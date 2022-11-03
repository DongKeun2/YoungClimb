package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.BoardScrap;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardScrapRepository extends JpaRepository<BoardScrap, Long> {
    Long countByBoard(Board board);

    List<BoardScrap> findByMember(Member member, Sort sort);

    Boolean existsByBoardAndMember(Board board, Member member);

    void deleteByBoardAndMember(Board board, Member member);
}
