package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.TokenDto;
import com.youngclimb.domain.model.dto.board.BoardMediaDto;
import com.youngclimb.domain.model.dto.board.NoticeDto;
import com.youngclimb.domain.model.dto.member.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MemberService {

    // 액세스 토큰 재발급
    public TokenDto reIssue(String email);

    // 이메일 중복 체크
    public boolean checkEmailDuplicate(MemberEmail email);

    // 아이디 중복 체크
    public boolean checkNicknameDuplicate(MemberNickname nickname);

    // 직접 회원 가입
    public LoginResDto insertUser(JoinMember joinMember) throws Exception;

    // 신체 정보 추가
//    public void addBodyInfo(MemberInfo memberInfo) throws Exception;
    // 프로필 추가
    public LoginResDto addProfile(String email, MemberProfile memberProfile) throws Exception;

    // 프로필 변경
    public LoginResDto editProfile(String email, MemberInfo memberInfo) throws Exception;

    // 사용자 비밀번호 검증
    public void verifyUser(String email, String password);

    // 비밀번호 수정
    public String changePassword(String userId, String password);

    // 회원 탈퇴
    public void deleteMember(String email);

    // 로그인
    public LoginResDto login(LoginMember member);

    // 운영자 로그인
    public LoginResDto adminLogin(LoginMember member) throws Exception;

    // 로그아웃
    void logout(String email, String accessToken);

    // 팔로우 추가, 제거
    Boolean addCancelFollow(String followingNickname, String followerEmail);

    // 팔로잉 팔로워 목록 읽기
    public FollowMemberList listFollow(String nickname, String email);

    // 알림 목록 읽기
    public List<NoticeDto> readNotice(String email);

    // 이미지 저장
    public String saveImage(MultipartFile file) throws InterruptedException;
}
