package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Center;
import com.youngclimb.domain.model.entity.CenterLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CenterLevelRepository extends JpaRepository<CenterLevel, Integer> {

    List<CenterLevel> findByCenterId(Integer centerId);
    List<CenterLevel> findAllByCenterOrderByIdAsc(Center center);



}
