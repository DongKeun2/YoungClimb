package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}
