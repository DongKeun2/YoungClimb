package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Center;
import com.youngclimb.common.model.entity.CenterLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CenterLevelRepository extends JpaRepository<CenterLevel, Integer> {

    Optional<CenterLevel> findByCenter(Center center);

}
