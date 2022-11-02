package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.MemberLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberLogRepository extends JpaRepository<MemberLog, Long> {
}
