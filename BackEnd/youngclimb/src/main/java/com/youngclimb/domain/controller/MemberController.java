package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 로그인

    // 회원가입

    // 로그아웃

    // 프로필 변경

}
