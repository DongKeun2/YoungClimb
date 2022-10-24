package com.youngclimb.domain.model.entity;

import javax.persistence.*;

@Entity
public class MemberProfileImg {

    @Id
    private Long memberId;

    @MapsId
    @OneToOne
    @JoinColumn(name="member_id")
    // 회원번호
    private Member member;
    // 프로필 사진 파일 이름
    private String profileImgPath;
}
