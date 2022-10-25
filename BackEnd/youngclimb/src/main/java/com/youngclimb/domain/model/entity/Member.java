package com.youngclimb.domain.model.entity;

import com.youngclimb.domain.model.dto.member.ProfileInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="tb_member")
@Entity
public class Member {

    // 회원번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Long memberId;
    // 이메일
    @Column(name = "member_email")
    private String email;
    // 비밀번호
    @Column(name = "member_pw")
    private String pw;
    // 닉네임
    @Column(name = "member_nickname")
    private String nickname;
    // 성별
    @Column(name = "gender")
    private String gender;
    // 신장
    @Column(name = "member_height")
    private Integer height;
    // 윙스팬
    @Column(name = "member_wingspan")
    private Integer wingspan;
    // 신발사이즈
    @Column(name = "member_shoe_size")
    private Integer shoeSize;
    // 자기소개
    @Column(name = "member_profile_content")
    private String profileContent;
    // 가입일자
    @Column(name = "member_join_date")
    private LocalDate joinDate;
    // 회원 등급 (User Role)
    @Enumerated(EnumType.STRING)
    @Column(name = "member_admin")
    private UserRole role;
    // 프로필 이미지
    @Column(name = "member_profile_img")
    private String memberProfileImg;

    // 프로필 이미지
//    @OneToOne(mappedBy = "member")
//    private MemberProfileImg memberProfileImg;

    // 비밀번호 암호화
    public Member hashPw(PasswordEncoder passwordEncoder) {
        this.pw = passwordEncoder.encode(this.pw);
        return this;
    }

    // 비밀번호 확인
    public boolean checkPw(String plainPw, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(plainPw, this.pw);
    }

    // 비밀번호 변경
    public void updatePw(String pw) {
        this.pw = pw;
    }

    // 닉네임 변경
    public Member updateProfile(String nickname) {
        this.nickname = nickname;
        return  this;
    }

    // 역할확인
    public String getRoleKey() {
        return this.role.getKey();
    }

    // 추가정보 입력
    public Member addMemberInfo(ProfileInfo profileInfo) {

        this.memberProfileImg = profileInfo.Image;

        return this;
    }

    // 프로필 사진 넣기
    public void updateMemberImg(String memberProfileImg) {
        this.memberProfileImg = memberProfileImg;
    }

}
