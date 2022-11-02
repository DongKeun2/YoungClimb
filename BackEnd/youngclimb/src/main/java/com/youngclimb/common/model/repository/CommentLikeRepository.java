package com.youngclimb.common.model.repository;

import com.youngclimb.common.model.entity.Comment;
import com.youngclimb.common.model.entity.CommentLike;
import com.youngclimb.common.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Boolean existsByCommentAndMember(Comment comment, Member member);

    void deleteByCommentAndMember(Comment comment, Member member);


}
