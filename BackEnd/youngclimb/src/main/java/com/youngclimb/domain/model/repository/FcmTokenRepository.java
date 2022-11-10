package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.FcmToken;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Long> {

    Optional<FcmToken> findByContentAndMember(String content, Member member);
}
