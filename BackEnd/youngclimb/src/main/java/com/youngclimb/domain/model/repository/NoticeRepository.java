package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
