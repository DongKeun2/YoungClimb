package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.member.*;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    // 이메일 중복 체크
    public boolean checkEmailDuplicate(String email);
    // 아이디 중복 체크
    public boolean checkNicknameDuplicate(String nickname);
    // 직접 회원 가입
    public String insertUser(JoinMember joinMember) throws Exception;
    // 신체 정보 추가
//    public void addBodyInfo(MemberInfo memberInfo) throws Exception;
    // 프로필 추가
    public void addProfile(MemberProfile memberProfile, MultipartFile file) throws Exception;
    // 프로필 변경
    public void editProfile(MemberInfo memberInfo, MultipartFile file) throws Exception;
    // 사용자 비밀번호 검증
    public void verifyUser(String email, String password);
    // 비밀번호 수정
    public String changePassword(String userId, String password);
    // 회원 탈퇴
    public void deleteMember(String email);
    // 로그인
    public String login(LoginMember member);
    // 로그아웃
    void logout(String email, String accessToken);
    // 팔로우 추가, 제거
    Boolean addCancelFollow(String followingNickname);
    // 팔로잉 팔로워 목록 읽기
    public FollowMemberList listFollow(String nickname);
}
