package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Board;
import com.youngclimb.common.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
//    List<Board> findByMember(Member member, Pageable pageable);

    List<Board> findByMember(Member member);


}
