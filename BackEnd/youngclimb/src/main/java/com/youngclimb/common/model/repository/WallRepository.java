package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Center;
import com.youngclimb.common.model.entity.Wall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WallRepository extends JpaRepository<Wall, Integer> {

    Optional<Wall> findByCenter(Center center);

}
