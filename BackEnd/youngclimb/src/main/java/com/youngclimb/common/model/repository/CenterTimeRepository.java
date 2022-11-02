package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Center;
import com.youngclimb.common.model.entity.CenterTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CenterTimeRepository extends JpaRepository<CenterTime, Integer> {

    Optional<CenterTime> findByCenter(Center center);

}
