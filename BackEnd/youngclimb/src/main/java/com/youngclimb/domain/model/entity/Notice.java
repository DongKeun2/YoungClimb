package com.youngclimb.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_notice")
public class Notice {
    // 알림 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long id;
    // 알림 받는 회원 번호
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "to_member_id")
    private Member toMember;
    // 알림 보내는 회원 번호
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "from_member_id")
    private Member fromMember;
    // 글 번호
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "board_id")
    private Board board;
    // 알림 타입 번호
    @Column(name = "notice_type")
    private Integer type;
    // 작성날짜
    @Column(name = "notice_created_datetime")
    private LocalDateTime createdDateTime = LocalDateTime.now();
}
