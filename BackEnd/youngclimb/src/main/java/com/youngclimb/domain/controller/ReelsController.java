package com.youngclimb.domain.controller;

import com.youngclimb.common.security.CurrentUser;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.dto.member.MemberEmail;
import com.youngclimb.domain.model.service.BoardService;
import com.youngclimb.domain.model.service.MemberService;
import com.youngclimb.domain.model.service.ReelsService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/reels")
@RequiredArgsConstructor
public class ReelsController {
    private final ReelsService reelsService;

    // 릴스 제공
    @ApiOperation(value = "serveReels: 릴스 제공")
    @GetMapping
    public ResponseEntity<?> serveReels(@PageableDefault(size = 5, sort = "createdDateTime", direction = Sort.Direction.DESC) Pageable pageable, @CurrentUser UserPrincipal principal) {
        try {
            return ResponseEntity.status(200).body(reelsService.serveReels(principal.getUsername(), pageable));
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 예외 처리
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
