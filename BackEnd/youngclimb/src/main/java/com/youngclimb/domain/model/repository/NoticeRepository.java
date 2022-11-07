package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Report, Long> {
}
