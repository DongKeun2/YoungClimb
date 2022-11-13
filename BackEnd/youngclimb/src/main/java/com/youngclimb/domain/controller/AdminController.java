package com.youngclimb.domain.controller;


import com.youngclimb.common.security.CurrentUser;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.service.ReportService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/report")
@RequiredArgsConstructor
public class AdminController {
    private final ReportService reportService;

//    @ApiOperation(value = "readReport : 신고 목록 조회")
//    @GetMapping
//    public ResponseEntity<?> readReport(@CurrentUser UserPrincipal principal) {
//        try {
//            return ResponseEntity.status(200).body(reportService.readReport(principal.getUsername()));
//        } catch (Exception e) {
//            return exceptionHandling(e);
//        }
//    }

    // 예외 처리
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
