package com.youngclimb.domain.controller;

import com.youngclimb.common.security.CurrentUser;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.dto.board.*;
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

    // 게시글 좋아요/취소
    @ApiOperation(value = "BoardLike : 좋아요 클릭")
    @PostMapping("/{boardId}/like")
    public ResponseEntity<?> boardLikeCancle(@PathVariable Long boardId) throws Exception {
        String email = "hello@young.climb";
        try {
            return new ResponseEntity<Boolean>(boardService.boardLikeCancle(boardId, email), HttpStatus.OK);

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

    // 댓글 좋아요/취소
    @ApiOperation(value = "CommentLike : 댓글 좋아요 클릭")
    @PostMapping("/comment/{commentId}/like")
    public ResponseEntity<?> commentLikeCancle(@PathVariable Long commentId) throws Exception {
        String email = "hello@young.climb";
        try {
            return new ResponseEntity<Boolean>(boardService.commentLikeCancle(commentId, email), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }


    // 게시물 스크랩/취소
    @ApiOperation(value = "upBoardScrap : 스크랩 클릭")
    @PostMapping("/{boardId}/scrap")
    public ResponseEntity<?> boardScrapCancle(@PathVariable Long boardId) throws Exception {
        String email = "hello@young.climb";
        try {
            return new ResponseEntity<Boolean>(boardService.boardScrapCancle(boardId, email), HttpStatus.OK);

        } catch (Exception e) {
            return exceptionHandling(e);
        }
    }


    // 게시글 신고
    @ApiOperation(value = "boardReport : 게시글 신고하기")
    @PostMapping("/{boardId}/report")
    public ResponseEntity<?> boardReport(@PathVariable Long boardId, @RequestBody ReportCreate reportCreate, @CurrentUser UserPrincipal principal) throws Exception {
        String email = principal.getUsername();
        try {
            return new ResponseEntity<Boolean>(boardService.boardReport(boardId, reportCreate.getContent(), email), HttpStatus.OK);

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
