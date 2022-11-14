package com.youngclimb.domain.controller;

import com.youngclimb.common.security.CurrentUser;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.dto.FcmTokenDto;
import com.youngclimb.domain.model.dto.center.CenterDetailDto;
import com.youngclimb.domain.model.service.FirebaseService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fcmtoken")
@RequiredArgsConstructor
public class FcmTokenController {

    private final FirebaseService firebaseService;

    // 토큰 저장
    @ApiOperation(value = "saveFcmToken : 토큰 저장")
    @PostMapping("/save")
    public ResponseEntity<?> saveFcmToken(@CurrentUser UserPrincipal principal, @RequestBody FcmTokenDto fcmTokenDto) {
        try {
            firebaseService.saveFcmToken(principal.getUsername(), fcmTokenDto.getFcmToken());
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 토큰 삭제
    @ApiOperation(value = "deleteFcmToken : 토큰 삭제")
    @PostMapping("/delete")
    public ResponseEntity<?> deleteFcmToken(@CurrentUser UserPrincipal principal) {
        try {
            firebaseService.deleteFcmToken(principal.getUsername());
            return new ResponseEntity<Void>(HttpStatus.OK);
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
