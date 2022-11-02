package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
