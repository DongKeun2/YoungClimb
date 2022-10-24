package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.member.JoinMember;
import com.youngclimb.domain.model.dto.member.LoginMember;
import com.youngclimb.domain.model.dto.member.MemberInfo;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    // 이메일 중복 체크
    public boolean checkEmailDuplicate(String email);
    // 아이디 중복 체크
    public boolean checkNicknameDuplicate(String nickname);
    // 직접 회원 가입
    public String insertUser(JoinMember joinMember) throws Exception;
    // 회원 정보 추가
    public void addUserInfo(MemberInfo memberInfo,  MultipartFile file) throws Exception;
    // 사용자 정보 조회
    public MemberInfo getUserInfoByUserId(String userId);
    // 사용자 비밀번호 검증
    public void verifyUser(String email, String password);
    // 비밀번호 수정
    public String changePassword(String userId, String password);
    // 회원 탈퇴
    public String deleteMember(String email);
    // 로그인
    public String login(LoginMember member);

}
