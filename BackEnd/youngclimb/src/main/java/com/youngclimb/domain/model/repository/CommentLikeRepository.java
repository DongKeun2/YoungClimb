package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Comment;
import com.youngclimb.domain.model.entity.CommentLike;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Boolean existsByCommentAndMember(Comment comment, Member member);

    void deleteByCommentAndMember(Comment comment, Member member);

}
