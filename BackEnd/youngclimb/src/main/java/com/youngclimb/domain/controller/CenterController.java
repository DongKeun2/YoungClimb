package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.center.CenterDetailDto;
import com.youngclimb.domain.model.dto.center.CenterDto;
import com.youngclimb.domain.model.dto.center.CenterLocation;
import com.youngclimb.domain.model.service.BoardService;
import com.youngclimb.domain.model.service.CenterService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/center")
@RequiredArgsConstructor
public class CenterController {

    private final CenterService centerService;

    // 지점 상세정보
    @ApiOperation(value = "readCenterDetail: 지점 상세정보")
    @GetMapping("/{centerId}")
    public ResponseEntity<?> readCenterDetail(@PathVariable Integer centerId) {
        try {
            CenterDetailDto centerDetailDto = centerService.readCenterDetail(centerId);
            if (centerDetailDto != null) {
                return new ResponseEntity<CenterDetailDto>(centerDetailDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 거리 순 지점 정보
    @ApiOperation(value = "distanceCenters: 거리순 지점정보")
    @PostMapping
    public ResponseEntity<?> distanceCenters(@RequestBody CenterLocation centerLocation) {
        try {
            List<CenterDto> centerDtos = centerService.distanceCenters(centerLocation.getLat(), centerLocation.getLon());
            if (centerDtos != null) {
                return new ResponseEntity<List<CenterDto>>(centerDtos, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
