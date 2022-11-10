package com.youngclimb.domain.model.repository;

import com.youngclimb.domain.model.entity.Follow;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    Optional<Notice> findByToMemberAndFromMember(Member toMember, Member fromMember);

    List<Notice> findAllByToMember(Member toMember);
}
