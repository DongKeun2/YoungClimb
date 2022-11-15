package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    Boolean existsByBoardAndMember(Board board, Member member);

    Optional<Report> findById(Long id);

    Optional<Report> findByBoardAndMember(Board board, Member member);

    List<Report> findAllByBoard(Board board);

    Long countByBoard(Board board);

}
