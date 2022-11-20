package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.dto.member.MemberPic;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByNickname(String nickname);
    boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    List<Member> findAllByNicknameContains(String nickname);

    List<Member> findAllByWingheightBetween(Integer startLength, Integer endLength);

    Optional<Member> findByMemberId(Long memberId);
}
