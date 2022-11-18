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


    Long countByBoard(Board board);

    List<Report> findByFlag(Integer flag);

    List<Report> findTop5ByFlagOrderByIdAsc(Integer flag);

    List<Report> findTop5ByOrderByIdDesc();

    List<Report> findTop5ByFlagOrderByIdDesc(Integer flag);

    List<Report> findByFlagNot(Integer flag);


}
