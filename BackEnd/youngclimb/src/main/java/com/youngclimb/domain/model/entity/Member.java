package com.youngclimb.domain.model.entity;

import java.time.LocalDate;

public class Member {

    // 회원번호
    private Long Id;
    // 이메일
    private String Email;
    // 비밀번호
    private String Pw;
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


}
