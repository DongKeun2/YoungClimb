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
    @Column(name="member_id")
    private Long id;
    // 이메일
    private String email;
    // 비밀번호
    private String pw;
    // 닉네임
    private String nickname;
    // 성별
    private String gender;
    // 생년월일
    private LocalDate birthday;
    // 신장
    private Integer height;
    // 윙스팬
    private Integer wingspan;
    // 신발사이즈
    private Integer shoesize;
    // 자기소개
    private String profileContent;
    // 가입일자
    private LocalDate joinDate;
    // 회원 등급 (User Role)
    @Enumerated(EnumType.STRING)
    private UserRole role;
    // 프로필 이미지
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
