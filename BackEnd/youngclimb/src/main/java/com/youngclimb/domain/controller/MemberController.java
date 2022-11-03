package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.dto.member.JoinMember;
import com.youngclimb.domain.model.dto.member.LoginMember;
import com.youngclimb.domain.model.dto.member.MemberInfo;
import com.youngclimb.domain.model.dto.member.MemberProfile;
import com.youngclimb.domain.model.service.BoardService;
import com.youngclimb.domain.model.service.MemberService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BoardService boardService;

    // 이메일 중복 확인
    @ApiOperation(value = "checkEmail: 이메일 중복 확인")
    @PostMapping("/email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        try {
            return ResponseEntity.status(200).body(memberService.checkEmailDuplicate(email));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("에러가 발생했습니다");
        }
    }

    // 닉네임 중복 확인
    @ApiOperation(value = "checkNickname: 닉네임 중복 확인")
    @PostMapping("/nickname")
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
    @PostMapping("/signup")
    public ResponseEntity<?> join(@RequestBody JoinMember member) throws Exception {
        try {
            return ResponseEntity.status(200).body(memberService.insertUser(member));
        } catch (Exception e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    // 신체 정보 입력
//    @ApiOperation(value = "addBodyInfo: 추가정보 입력")
//    @PostMapping("/addBody")
//    public ResponseEntity<?> addBodyInfo(@RequestBody MemberInfo memberInfo) throws Exception {
//        try {
//            memberService.addBodyInfo(memberInfo);
//            return new ResponseEntity<String>("추가 정보가 입력되었습니다.", HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<String>("오류가 발생했습니다.", HttpStatus.BAD_REQUEST);
//        }
//    }

    // 프로필 정보 입력
    @ApiOperation(value = "addProfile: 프로필 정보 입력")
    @PostMapping("/profile")
    public ResponseEntity<?> addProfile(@RequestPart MemberProfile memberProfile, @RequestPart(required = false) MultipartFile file) throws Exception {
        try {
            memberService.addProfile(memberProfile, file);
            return new ResponseEntity<String>("프로필이 설정되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("오류가 발생했습니다", HttpStatus.BAD_REQUEST);
        }
    }
    // 프로필 변경
    @ApiOperation(value = "addProfile: 프로필 정보 입력")
    @PostMapping("/profile/edit")
    public ResponseEntity<?> editProfile(@RequestPart MemberInfo memberInfo, @RequestPart(required = false) MultipartFile file) throws Exception {
        try {
            memberService.editProfile(memberInfo, file);
            return new ResponseEntity<String>("프로필이 변경되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("오류가 발생했습니다", HttpStatus.BAD_REQUEST);
        }
    }



    // 로그아웃
    @ApiOperation(value = "logout: 로그아웃")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(String email, HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").substring(7);
        memberService.logout(email, accessToken);
        return new ResponseEntity<String>("로그아웃 완료", HttpStatus.OK);
    }

    // 팔로우 추가, 취소
    @ApiOperation(value = "addCancelFollow")
    @PostMapping("/{nickname}/follow")
    public ResponseEntity<?> addCancelFollow(@PathVariable String nickname) {
        try {
            Boolean addCancelFollow = memberService.AddCancelFollow(nickname);
            if (addCancelFollow != null) {
                return new ResponseEntity<Boolean>(addCancelFollow, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 토큰 재발급
//    @PostMapping("/reissue")
//    public ResponseEntity<TokenDto> reissue(@RequestHeader("RefreshToken") String refreshToken) {
//        try {
//            return ResponseEntity.ok(memberService.reissue(refreshToken));
//        } catch (Exception e) {
//            return exceptionHandling(e);
//        }
//    }


    // 예외처리
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
