package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Center;
import com.youngclimb.domain.model.entity.CenterTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CenterTimeRepository extends JpaRepository<CenterTime, Integer> {

    Optional<CenterTime> findByCenter(Center center);

}
