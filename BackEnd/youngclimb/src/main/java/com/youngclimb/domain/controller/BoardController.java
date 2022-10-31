package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.dto.FeedDto;
import com.youngclimb.domain.model.dto.board.BoardCreate;
import com.youngclimb.domain.model.dto.board.BoardDetailDto;
import com.youngclimb.domain.model.service.BoardService;
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
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 전체 게시글 조회
    @ApiOperation(value = "readAllBoard: 전체 게시글 조회")
    @GetMapping("/home")
    public ResponseEntity<?> readAllBoard(String email, @PageableDefault(size = 5, sort = "createdDateTime", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {

        try {
            List<FeedDto> feedDtos = boardService.readAllBoard(email, pageable, null);
            if (feedDtos != null) {
                return new ResponseEntity<List<FeedDto>>(feedDtos, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 게시물 작성
    @ApiOperation(value = "writeBoard : 글 작성하기")
    @PostMapping("/write")
    public ResponseEntity<?> writeBoard(
            //			@RequestBody BoardCreate boardCreate
            @RequestPart BoardCreate boardCreate
            , @RequestPart(name = "files", required = false) List<MultipartFile> files
//			,@RequestParam(name = "files", required = false) List<MultipartFile> files
    ) throws Exception {
        try {
            boardService.writeBoard(boardCreate, files);
            return new ResponseEntity<Void>(HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }
    // 게시글 댓글 조회(본문 + 댓글 리스트)
    @ApiOperation(value = "readOneBoard : 게시글-댓글 조회")
    @GetMapping("/board/{boardId}/{userId}")
    public ResponseEntity<?> readOneBoard(@PathVariable Long boardId, @PathVariable String userId) throws Exception {
        try {
            BoardDetailDto boardDetailDto = boardService.readAllComments(boardId, userId);
            if (boardDetailDto != null) {
                return new ResponseEntity<BoardDetailDto>(boardDetailDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 게시글 좋아요
    @ApiOperation(value = "upBoardLike : 좋아요 클릭")
    @PostMapping("/board/{boardId}/like/{userId}")
    public ResponseEntity<?> upBoardLike(@PathVariable Long boardId, @PathVariable String userId) throws Exception {

        try {
            boardService.upBoardLike(boardId, userId);
            return new ResponseEntity<Void>(HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }


    // 게시글 신고

    // 댓글 작성

    // 댓글 좋아요

    // 대댓글 작성

    // 게시물 스크랩

    // 게시글 검색


    // 예외 처리
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
