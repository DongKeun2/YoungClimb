package com.youngclimb.domain.controller;

import com.youngclimb.common.security.CurrentUser;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.dto.board.NoticeDto;
import com.youngclimb.domain.model.dto.member.*;
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
import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BoardService boardService;

    // 이메일 중복 확인
    @ApiOperation(value = "checkEmail: 이메일 중복 확인")
    @PostMapping("/email")
    public ResponseEntity<?> checkEmail(@RequestBody MemberEmail email) {
        try {
            if (email.getEmail().equals(null)) return ResponseEntity.status(400).body("빈 이메일입니다.");
            return ResponseEntity.status(200).body(memberService.checkEmailDuplicate(email));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("에러가 발생했습니다");
        }
    }

    // 닉네임 중복 확인
    @ApiOperation(value = "checkNickname: 닉네임 중복 확인")
    @PostMapping("/nickname")
    public ResponseEntity<?> checkNickname(@RequestBody MemberNickname nickname) {
        try {
            if (nickname.getNickname().equals(null)) return ResponseEntity.status(400).body("빈 닉네임입니다.");
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
            return new ResponseEntity<LoginResDto>(memberService.login(member), HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
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
    @PostMapping("/profile/{intro}/{nickname}")
    public ResponseEntity<?> addProfile(@PathVariable String intro, @PathVariable String nickname, @RequestPart(value = "file", required = false) MultipartFile file, @CurrentUser UserPrincipal principal) throws Exception {
        if (intro.isBlank()) intro = "";

        MemberProfile memberProfile = MemberProfile.builder()
                .intro(intro)
                .build();
        System.out.println(memberProfile);
        try {
            memberService.addProfile(principal.getUsername(), memberProfile, file);
            return new ResponseEntity<String>("프로필이 설정되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 프로필 변경
    @ApiOperation(value = "editProfile: 프로필 정보 수정")
    @PostMapping("/profile/edit/{intro}/{height}/{shoeSize}/{wingspan}/{nickname}")
    public ResponseEntity<?> editProfile(@PathVariable String intro, @PathVariable Integer height, @PathVariable Integer shoeSize, @PathVariable Integer wingspan, @PathVariable String nickname, @RequestPart(value = "file", required = false) MultipartFile file, @CurrentUser UserPrincipal principal) throws Exception {
        if (intro.isBlank()) intro = null;
        if (height.equals(0)) height = null;
        if (shoeSize.equals(0)) shoeSize = null;
        if (wingspan.equals(0)) wingspan = null;

        MemberInfo memberInfo = MemberInfo.builder()
                .nickname(nickname)
                .intro(intro)
                .height(height)
                .shoeSize(shoeSize)
                .wingspan(wingspan)
                .build();
        try {
            memberService.editProfile(principal.getUsername(), memberInfo, file);
            return new ResponseEntity<String>("프로필이 변경되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }


    // 로그아웃
    @ApiOperation(value = "logout: 로그아웃")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CurrentUser UserPrincipal principal, HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").substring(7);
        memberService.logout(principal.getUsername(), accessToken);
        return new ResponseEntity<String>("로그아웃 완료", HttpStatus.OK);
    }

    // 팔로우 추가, 취소
    @ApiOperation(value = "addCancelFollow")
    @PostMapping("/{nickname}/follow")
    public ResponseEntity<?> addCancelFollow(@PathVariable String nickname, @CurrentUser UserPrincipal principal) {
        try {
            Boolean addCancelFollow = memberService.addCancelFollow(nickname, principal.getUsername());
            if (addCancelFollow != null) {
                return new ResponseEntity<Boolean>(addCancelFollow, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }


    @ApiOperation(value = "팔로잉, 팔로워 목록 읽기")
    @GetMapping("/{nickname}/follow")
    public ResponseEntity<?> listFollow(@PathVariable String nickname, @CurrentUser UserPrincipal principal) {
        try {
            FollowMemberList followMemberList = memberService.listFollow(nickname, principal.getUsername());
            if (followMemberList != null) {
                return new ResponseEntity<FollowMemberList>(followMemberList, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 유저 정보 조회
    @ApiOperation(value = "readProfile : 유저 정보 조회")
    @GetMapping("/{nickname}")
    public ResponseEntity<?> readProfile(@PathVariable String nickname, @CurrentUser UserPrincipal principal) throws Exception {
        try {
            System.out.println(principal.getUsername());
            MemberDto memberDto = boardService.getUserInfoByUserId(nickname, principal.getUsername());
            if (memberDto != null) {
                return new ResponseEntity<MemberDto>(memberDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 알림 목록 읽기
    @ApiOperation(value = "readNotice : 알림 목록 읽기")
    @GetMapping("/notice")
    public ResponseEntity<?> readProfile(@CurrentUser UserPrincipal principal) throws Exception {
        try {
            String email = principal.getUsername();
            List<NoticeDto> noticeDtos = memberService.readNotice(principal.getUsername());
            if (noticeDtos != null) {
                return new ResponseEntity<List<NoticeDto>>(noticeDtos, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 이미지 저장
    @ApiOperation(value = "saveImage: 이미지 저장하기")
    @PostMapping("/save/image")
    public ResponseEntity<?> saveImage(@RequestPart(name = "file", required = false) MultipartFile file) throws Exception {
        try {
            return new ResponseEntity<>(boardService.saveImage(file), HttpStatus.OK);

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
