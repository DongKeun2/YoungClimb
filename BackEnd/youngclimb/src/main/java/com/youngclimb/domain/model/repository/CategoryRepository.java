package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByBoard(Board board);
//
//    List<Category> findAllByCenterIdAndWallIdAndCenterLevelIdAndHoldColor(Integer centerId, Integer WallId, Integer CenterLevelId, String HoldColor);

}
