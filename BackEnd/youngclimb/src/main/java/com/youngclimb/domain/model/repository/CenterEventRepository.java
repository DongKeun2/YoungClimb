package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Center;
import com.youngclimb.domain.model.entity.CenterEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CenterEventRepository extends JpaRepository<CenterEvent, Integer> {

    Optional<CenterEvent> findByCenter(Center center);

}
