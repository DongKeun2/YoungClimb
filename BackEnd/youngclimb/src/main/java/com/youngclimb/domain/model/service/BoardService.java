package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.*;
import com.youngclimb.domain.model.dto.member.MemberDto;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface BoardService {
    // 전체 게시글 조회
    public MainPageDto readRecentBoard(String userId, Pageable pageable);

    // 추가 게시글 조회
    public MainPageDto readAddBoard(String userId, Pageable pageable);

    // 게시글 조회수 증가
    public Long updateView(Long boardId);

    // 이미지 저장
    public BoardMediaDto saveImage(MultipartFile file) throws InterruptedException;

    // 게시물 작성
    public void writeBoard(String email, BoardCreate boardCreate);

    // 게시글 수정
    public void updateBoard(String email, BoardEdit boardEdit, Long boardId);

    // 게시글 삭제
    public void deleteBoard(String email, Long boardId);

    // 게시글 좋아요
    public BoardLikeDto boardLikeCancle(Long boardId, String email);

    // 게시글 댓글 조회
    public BoardDetailDto readAllComments(Long boardId, String email);

    // 댓글 좋아요/취소
    public Boolean commentLikeCancle(Long commentId, String email);

    // 댓글 작성
    public void writeComment(CommentCreate commentCreate, Long boardId, String email);
    // 대댓글 작성
    public void writeRecomment(CommentCreate commentCreate, Long boardId, Long commentId, String email);

    // 댓글 삭제
    public void deleteComment(Long commentId, String email);

    // 게시글 스크랩/취소
    public Boolean boardScrapCancle(Long boardId, String email);
    // 사용자 정보 조회
    public MemberDto getUserInfoByUserId(String userId, String loginEmail);
    // 게시글 신고하기
    public Boolean boardReport(Long boardId, Integer content, String email);

}
