package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.Comment;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    Long countByBoard(Board board);
    Optional<Comment> findByBoard(Board board);
    List<Comment> findAllByBoard(Board board, Sort sort);
    List<Comment> findByParentId(Long id, Sort sort);
    // 댓글 개수 찾기
    Long countByMemberAndParentId(Member member, Long ParentId);
    // 대댓글 개수 찾기
    Long countByMemberAndParentIdNot(Member member, Long ParentId);




}
