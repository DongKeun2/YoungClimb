package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.dto.FeedDto;
import com.youngclimb.domain.model.dto.board.*;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final BoardMediaRepository boardMediaRepository;
    private final BoardLikeRepository boardLikeRepository;
    private final CommentRepository commentRepository;

    private final AmazonS3 amazonS3;

    // 게시글 읽기
    @Override
    public List<FeedDto> readAllBoard(String email, Pageable pageable, UserPrincipal currUser) {
        List<FeedDto> feedDtos = new ArrayList<>();

        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDateTime"));

        for (Board board : boards) {
            FeedDto feedDto = new FeedDto();

            BoardDto boardDto = BoardDto.builder()
                    .id(board.getBoardId())
                    .createUser(member.getNickname())
                    .build();

            // 게시글 DTO 세팅
            feedDto.setBoardDto(board.toBoardDto());

            // 게시글 미디어 DTO 세팅
            List<BoardMediaDto> boardMediaDtos = new ArrayList<>();
            List<BoardMedia> boardMedias = boardMediaRepository.findByBoard(board);
            for (BoardMedia boardMedia : boardMedias) {
                boardMediaDtos.add(boardMedia.toMediaDto());
            }
            feedDto.setBoardMediaDtos(boardMediaDtos);

            // 좋아요 여부 세팅
            BoardLike boardLike = boardLikeRepository.findByBoardAndMember(board, member).orElseThrow();
            feedDto.setBoardLiked(true);

            // 댓글 DTO 1개 세팅
            Comment comment = commentRepository.findByBoard(board).orElseThrow();
            feedDto.setCommentDto(comment.toCommentDto());

            // List add
            feedDtos.add(feedDto);
        }

        return feedDtos;
    }

    // 게시글 작성
    @Override
    public void writeBoard(BoardCreate boardCreate, List<MultipartFile> files) {

        // 게시글 기본 entity
        Board board = boardCreate.toBoard();
        boardRepository.save(board);
        // 작성자 연결하기

        // 이미지 연결하기
        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;

            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            System.out.println(fileName);
            try (InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket + "/boardImg", fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
            BoardMedia boardMedia = BoardMedia.builder().board(board).mediaPath(amazonS3.getUrl(bucket + "/boardImg", fileName).toString())
                    .build();
            boardMediaRepository.save(boardMedia);
        }

        // 태그 연결하기
//        List<BoardTagDto> boardTagDtos =
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일입니다");
        }
    }

    // 게시글 좋아요
    @Override
    public void upBoardLike(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        BoardLike boardLike = BoardLike.builder()
                .board(board)
                .member(member)
                .build();
        boardLikeRepository.save(boardLike);
    }

    // 게시글 - 댓글 상세보기
    @Override
    public BoardDetailDto readAllComments(Long boardId, String memberId) {
        BoardDetailDto boardDetailDto = new BoardDetailDto();

        // 게시글 DTO 세팅
        Board board = boardRepository.findById(boardId).orElseThrow();
        boardDetailDto.setBoardDto(board.toBoardDto());

        // 댓글 DTO 세팅
        List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDateTime"));
        List<CommentDto> commentDtos = new ArrayList<>();
        for(Comment comment : comments) {
            CommentDto commentDto = comment.toCommentDto();
            commentDtos.add(commentDto);
        }
        boardDetailDto.setCommentDtos(commentDtos);

        return boardDetailDto;
    }
}
