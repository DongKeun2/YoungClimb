package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByBoard(Board board);

    // 게시글 검색하기
    List<Category> findAllByCenterId(Integer centerId);
    List<Category> findAllByCenterIdAndCenterlevelId(Integer centerId, Integer levelId);
    List<Category> findAllByCenterIdAndHoldcolor(Integer centerId, String holdColor);
    List<Category> findAllByCenterIdAndWallId(Integer centerId, Integer wallId);
    List<Category> findAllByCenterIdAndCenterlevelIdAndWallId(Integer centerId, Integer levelId, Integer wallId);
    List<Category> findAllByCenterIdAndHoldcolorAndWallId(Integer centerId, String holdColor, Integer wallId);
    List<Category> findAllByCenterIdAndCenterlevelIdAndHoldcolor(Integer centerId, Integer levelId, String holdColor);
    List<Category> findAllByCenterIdAndCenterlevelIdAndHoldcolorAndWallId(Integer centerId, Integer levelId, String holdColor, Integer wallId);




}
