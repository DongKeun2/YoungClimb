package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.service.DownloadService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/download")
@RequiredArgsConstructor
public class DownloadController {
    private final DownloadService downloadService;

    // 다운로드 수 제공
    @ApiOperation(value = "serveDownload : 다운로드 수 제공")
    @GetMapping
    public ResponseEntity<?> serveDownload() throws Exception {
        try {
            return new ResponseEntity<Integer>(downloadService.serveDownload(), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 다운로드 수 업데이트
    @ApiOperation(value = "updateDownload : 다운로드 수 업데이트")
    @PostMapping
    public ResponseEntity<?> updateDownload() throws Exception {
        try {
            return new ResponseEntity<Integer>(downloadService.updateDownload(), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
