package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
//    List<Board> findByMember(Member member, Pageable pageable);

    List<Board> findByMember(Member member, Sort sort);

    Slice<Board> findAllByCreatedDateTimeAfterOrderByCreatedDateTimeDesc(LocalDateTime localDateTime, Pageable pageable);

    Slice<Board> findAllByCreatedDateTimeBeforeOrderByCreatedDateTimeDesc(LocalDateTime localDateTime, Pageable pageable);

    Long countByMember(Member member);

    List<Board> findAllByBoardViewGreaterThan(Integer views, Sort sort);

    List<Board> findByBoardViewGreaterThanOrderByBoardViewDesc(Long views);
}
