package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.dto.member.MemberEmail;
import com.youngclimb.domain.model.service.BoardService;
import com.youngclimb.domain.model.service.MemberService;
import com.youngclimb.domain.model.service.ReelsService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/reels")
@RequiredArgsConstructor
public class ReelsController {
    private final ReelsService reelsService;

    // 이메일 중복 확인
    @ApiOperation(value = "checkEmail: 이메일 중복 확인")
    @GetMapping
    public ResponseEntity<?> serveReels(Principal principal) {
        try {
            return ResponseEntity.status(200).body(reelsService.serveReels(principal.getName()));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("에러가 발생했습니다");
        }
    }
}
