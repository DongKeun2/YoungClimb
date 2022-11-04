package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Download;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DownloadRepository extends JpaRepository<Download, Integer> {
}