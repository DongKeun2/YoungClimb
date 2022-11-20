package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.MemberLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberLogRepository extends JpaRepository<MemberLog, Long> {
}
