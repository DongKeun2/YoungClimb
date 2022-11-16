package com.youngclimb.domain.controller;


import com.youngclimb.common.exception.ForbiddenException;
import com.youngclimb.common.security.CurrentUser;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.dto.member.LoginMember;
import com.youngclimb.domain.model.dto.member.LoginResDto;
import com.youngclimb.domain.model.service.AdminService;
import com.youngclimb.domain.model.service.MemberService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final MemberService memberService;

    // 신고 목록 조회
    @ApiOperation(value = "readReport : 신고 목록 조회")
    @GetMapping("/report")
    public ResponseEntity<?> readReport(@CurrentUser UserPrincipal principal) {
        try {
            return ResponseEntity.status(200).body(adminService.readReport(principal.getUsername()));
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 신고 상세 조회
    @ApiOperation(value = "readReportDetail : 신고 상세 조회")
    @GetMapping("/report/{reportId}")
    public ResponseEntity<?> readReportDetail(@CurrentUser UserPrincipal principal, @PathVariable Long reportId) {
        try {
            return ResponseEntity.status(200).body(adminService.readReportDetail(reportId));
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 신고한 게시물 삭제
    @ApiOperation(value = "deleteReport : 신고한 게시물 삭제")
    @PostMapping("/report/{reportId}/delete")
    public ResponseEntity<?> deleteReport(@CurrentUser UserPrincipal principal, @PathVariable Long reportId) {
        try {
            adminService.deleteReport(reportId);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 신고한 게시물 패스
    @ApiOperation(value = "deleteReport : 신고한 게시물 패스")
    @PostMapping("/report/{reportId}/pass")
    public ResponseEntity<?> passReport(@CurrentUser UserPrincipal principal, @PathVariable Long reportId) {
        try {
            adminService.passReport(reportId);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 신고한 게시물 보류
    @ApiOperation(value = "postponeReport : 신고한 게시물 보류")
    @PostMapping("/report/{reportId}/postpone")
    public ResponseEntity<?> postponeReport(@CurrentUser UserPrincipal principal, @PathVariable Long reportId) {
        try {
            adminService.postponeReport(reportId);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 운영자 로그인
    @ApiOperation(value = "login: 관리자 로그인")
    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody LoginMember member, HttpServletResponse response) throws Exception {
        try {
            return new ResponseEntity<LoginResDto>(memberService.adminLogin(member), HttpStatus.OK);
        } catch (ForbiddenException e) {
            return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.FORBIDDEN);
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
