package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.CenterPrice;
import com.youngclimb.common.model.entity.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CenterPriceRepository extends JpaRepository<CenterPrice, Integer> {

    Optional<CenterPrice> findByCenter(Center center);

}
