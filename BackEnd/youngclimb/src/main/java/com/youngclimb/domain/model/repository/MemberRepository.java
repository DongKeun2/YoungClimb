package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);

    Optional<Member> findByMemberId(Long memberId);
}
