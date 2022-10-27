package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.dto.member.JoinMember;
import com.youngclimb.domain.model.dto.member.LoginMember;
import com.youngclimb.domain.model.service.MemberService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 이메일 중복 확인
    @ApiOperation(value = "checkEmail: 이메일 중복 확인")
    @GetMapping("/dupl/email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        try {
            return ResponseEntity.status(200).body(memberService.checkEmailDuplicate(email));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("에러가 발생했습니다");
        }
    }

    // 닉네임 중복 확인
    @ApiOperation(value = "checkNickname: 닉네임 중복 확인")
    @GetMapping("/dupl/nickname")
    public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
        try {
            return ResponseEntity.status(200).body(memberService.checkNicknameDuplicate(nickname));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("에러가 발생했습니다");
        }
    }

    // 로그인
    @ApiOperation(value = "login: 로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginMember member, HttpServletResponse response) throws Exception {
        try {
            // 헤더에 쿠키 붙이기
            response.addHeader("Set-Cookie", "refreshToken="+memberService.login(member)+"; path=/; MaxAge=7 * 24 * 60 * 60; SameSite=Lax; HttpOnly");
            return ResponseEntity.status(200).body(memberService.login(member));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("로그인 에러가 발생했습니다.");
        }
    }

    // 회원가입
    @ApiOperation(value = "join: 회원가입")
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinMember member) throws Exception {
        try {
            return ResponseEntity.status(200).body(memberService.insertUser(member));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    // 로그아웃
    @ApiOperation(value = "logout: 로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<?> logout(String email, HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").substring(7);
        memberService.logout(email, accessToken);
        return new ResponseEntity<String>("로그아웃 완료", HttpStatus.OK);
    }

    // 프로필 변경

    // 예외처리
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
