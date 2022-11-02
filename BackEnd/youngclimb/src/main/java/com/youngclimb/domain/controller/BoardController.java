package com.youngclimb.domain.controller;

import com.youngclimb.domain.model.dto.board.BoardCreate;
import com.youngclimb.domain.model.dto.board.BoardDetailDto;
import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.CommentCreate;
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
    public ResponseEntity<?> readAllBoard(@PageableDefault(size = 5, sort = "createdDateTime", direction = Sort.Direction.DESC) Pageable pageable) throws Exception {
        String email = "hello@young.climb";
        try {
            List<BoardDto> boardDtos = boardService.readAllBoard(email, pageable, null);
            if (boardDtos != null) {
                return new ResponseEntity<List<BoardDto>>(boardDtos, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 게시물 작성
    @ApiOperation(value = "writeBoard : 글 작성하기")
    @PostMapping
    public ResponseEntity<?> writeBoard(
//            			@RequestBody BoardCreate boardCreate
            @RequestPart BoardCreate boardCreate
            , @RequestPart(name = "file", required = false) MultipartFile file
//			,@RequestParam(name = "file", required = false) MultipartFile file
    ) throws Exception {
        try {
            boardService.writeBoard(boardCreate, file);
            return new ResponseEntity<Void>(HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }
    // 게시글 댓글 조회(본문 + 댓글 리스트)
    @ApiOperation(value = "readOneBoard : 게시글-댓글 조회")
    @GetMapping("/{boardId}")
    public ResponseEntity<?> readOneBoard(@PathVariable Long boardId) throws Exception {
        Long userId = 1L;
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
    @ApiOperation(value = "BoardLike : 좋아요 클릭")
    @PostMapping("/{boardId}/like")
    public ResponseEntity<?> boardLike(@PathVariable Long boardId) throws Exception {
        String email = "hello@young.climb";
        try {
            return new ResponseEntity<Boolean>(boardService.boardLike(boardId, email), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 게시글 좋아요 취소
    @ApiOperation(value = "BoardUnlike : 좋아요 취소")
    @PostMapping("/{boardId}/unlike")
    public ResponseEntity<?> boardUnlike(@PathVariable Long boardId) throws Exception {
        String email = "hello@young.climb";
        try {
            return new ResponseEntity<Boolean>(boardService.boardUnlike(boardId, email), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 댓글 작성
    @ApiOperation(value = "WriteComment : 댓글 작성")
    @PostMapping("/{boardId}/comment")
    public ResponseEntity<?> writeComment(@RequestBody CommentCreate commentCreate, @PathVariable Long boardId) throws Exception {
        commentCreate.setBoardId(boardId);
        commentCreate.setMemberId(1L);
        try {
            boardService.writeComment(commentCreate);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }


    // 대댓글 작성
    @ApiOperation(value = "WriteRecomment : 대댓글 작성")
    @PostMapping("/{boardId}/comment/{commentId}")
    public ResponseEntity<?> writeRecomment(@RequestBody CommentCreate commentCreate, @PathVariable Long boardId, @PathVariable Long commentId) throws Exception {
        commentCreate.setBoardId(boardId);
        commentCreate.setMemberId(1L);
        commentCreate.setParaentId(commentId);
        try {
            boardService.writeRecomment(commentCreate);
            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 댓글 좋아요
    @ApiOperation(value = "CommentLike : 댓글 좋아요 클릭")
    @PostMapping("/{boardId}/comment/{commentId}/like")
    public ResponseEntity<?> commentLike(@PathVariable Long boardId, @PathVariable Long commentId) throws Exception {
        String email = "hello@young.climb";
        try {
            return new ResponseEntity<Boolean>(boardService.commentLike(commentId, email), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 댓글 좋아요 취소
    @ApiOperation(value = "CommentUnlike : 댓글 좋아요 취소")
    @PostMapping("/{boardId}/comment/{commentId}/unlike")
    public ResponseEntity<?> commentUnlike(@PathVariable Long boardId, @PathVariable Long commentId) throws Exception {
        String email = "hello@young.climb";
        try {
            return new ResponseEntity<Boolean>(boardService.commentUnlike(commentId, email), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }



    // 게시물 스크랩
    @ApiOperation(value = "upBoardScrap : 스크랩 클릭")
    @PostMapping("/{boardId}/scrap/{userId}")
    public ResponseEntity<?> upBoardScrap(@PathVariable Long boardId, @PathVariable String userId) throws Exception {

        try {
            return new ResponseEntity<Boolean>(boardService.boardScrap(boardId, userId), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 게시물 스크랩
    @ApiOperation(value = "upBoardUnScrap : 스크랩 클릭")
    @PostMapping("/{boardId}/unscrap/{userId}")
    public ResponseEntity<?> upBoardUnScrap(@PathVariable Long boardId, @PathVariable String userId) throws Exception {

        try {
            return new ResponseEntity<Boolean>(boardService.boardUnScrap(boardId, userId), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }

    // 게시글 검색

    // 게시글 신고


    // 예외 처리
    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
