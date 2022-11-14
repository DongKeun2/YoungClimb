package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Board;
import com.youngclimb.domain.model.entity.Comment;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Optional<Notice> findByToMemberAndFromMemberAndType(Member toMember, Member fromMember, Integer type);

    Optional<Notice> findByBoardAndFromMemberAndType(Board board, Member fromMember, Integer type);
    Optional<Notice> findByCommentAndFromMemberAndType(Comment comment, Member fromMember, Integer type);

    List<Notice> findAllByToMember(Member toMember);
}
