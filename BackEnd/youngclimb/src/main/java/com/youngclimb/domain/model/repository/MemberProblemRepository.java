package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.entity.MemberProblem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberProblemRepository extends JpaRepository<MemberProblem, Member> {
    Optional<MemberProblem> findByMember(Member member);


}
