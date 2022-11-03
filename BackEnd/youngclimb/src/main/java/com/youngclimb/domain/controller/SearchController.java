package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.dto.UserSearchDto;
import com.youngclimb.domain.model.dto.board.BoardSearchDto;
import com.youngclimb.domain.model.dto.member.MemberPic;
import com.youngclimb.domain.model.service.SearchService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;

    @ApiOperation(value = "recMember: 유저 추천")
    @GetMapping("/user")
    public ResponseEntity<?> recMember() {
        try {
            List<MemberPic> memberPics = searchService.getMemberRec();
            if (!memberPics.isEmpty()) {
                return new ResponseEntity<List<MemberPic>>(memberPics, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    @ApiOperation(value = "searchMember: 유저 검색")
    @PostMapping("/user")
    public ResponseEntity<?> searchMember(@RequestBody UserSearchDto userSearchDto) {
        try {
            List<MemberPic> memberPics = searchService.getMemberPic(userSearchDto.getKeyword());
            if (!memberPics.isEmpty()) {
                return new ResponseEntity<List<MemberPic>>(memberPics, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

//    @ApiOperation(value = "searchMember: 유저 검색")
//    @PostMapping("/board")
//    public ResponseEntity<?> searchBoard(@RequestBody BoardSearchDto boardSearchDto) {
//        try {
//            List<MemberPic> memberPics = searchService.getMemberPic(boardSearchDto);
//            if (!memberPics.isEmpty()) {
//                return new ResponseEntity<List<MemberPic>>(memberPics, HttpStatus.OK);
//            } else {
//                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//            }
//        } catch (Exception e) {
//            return exceptionHandling(e);
//        }
//    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
