package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.youngclimb.common.security.UserPrincipal;
import com.youngclimb.domain.model.dto.FeedDto;
import com.youngclimb.domain.model.dto.board.*;
import com.youngclimb.domain.model.dto.member.CreateMember;
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
    private final BoardScrapRepository boardScrapRepository;
    private final CommentRepository commentRepository;
    private final CategoryRepository categoryRepository;
    private final CenterRepository centerRepository;
    private final WallRepository wallRepository;
    private final CenterLevelRepository centerLevelRepository;
    private final FollowRepository followRepository;
    private final RankRepository rankRepository;
    private final MemberRankExpRepository memberRankExpRepository;
    private final AmazonS3 amazonS3;

    // 게시글 읽기
    @Override
    public List<BoardDto> readAllBoard(String email, Pageable pageable, UserPrincipal currUser) {
        List<BoardDto> boardDtos = new ArrayList<>();
        List<FeedDto> feedDtos = new ArrayList<>();

        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<Board> boards = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "createdDateTime"));

        for (Board board : boards) {

            // 게시글 DTO 세팅
            BoardDto boardDto = BoardDto.builder()
                    .id(board.getBoardId())
                    .solvedDate(board.getSolvedDate())
                    .content(board.getContent())
                    .like(boardLikeRepository.countByBoard(board))
                    .view(boardScrapRepository.countByBoard(board))
                    .isLiked(boardLikeRepository.existsByBoardAndMember(board, member))
                    .isScrap(boardScrapRepository.existsByBoardAndMember(board, member))
                    .commentNum(commentRepository.countByBoard(board))
                    .build();

            // 게시글 미디어 path 세팅
            BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();
            boardDto.setMediaPath(boardMedia.getMediaPath());

            // 댓글 DTO 1개 세팅
            List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDateTime"));
            if (comments.get(0) != null) {
                CommentPreviewDto commentPreviewDto = CommentPreviewDto.builder()
                        .nickname(comments.get(0).getMember().getNickname())
                        .comment(comments.get(0).getContent())
                        .build();
                boardDto.setCommentPreviewDto(commentPreviewDto);
            }

            // List add
            boardDtos.add(boardDto);
        }

        return boardDtos;
    }

    // 게시글 작성
    @Override
    public void writeBoard(BoardCreate boardCreate, MultipartFile file) {

        // 게시글 저장하기
        Board board = boardCreate.toBoard();
        Member member = memberRepository.findById(boardCreate.getMemberId()).orElseThrow();
        board.setMember(member);
        boardRepository.save(board);

        // 카테고리 저장하기
        Category category = Category.builder()
                .board(board)
                .center(centerRepository.findById(boardCreate.getCenterId()).orElseThrow())
                .wall(wallRepository.findById(boardCreate.getWallId()).orElseThrow())
                .centerlevel(centerLevelRepository.findById(boardCreate.getCenterLevelId()).orElseThrow())
                .holdColor(boardCreate.getHoldColor())
                .difficulty(centerLevelRepository.findById(boardCreate.getCenterLevelId()).orElseThrow().getLevel().getRank())
                .build();
        categoryRepository.save(category);

        // 이미지 저장하기
            if (!file.isEmpty()) {
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
    public Boolean upBoardLike(Long boardId, String email) {
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member member = memberRepository.findByEmail(email).orElseThrow();

        BoardLike boardLike = BoardLike.builder()
                .board(board)
                .member(member)
                .build();
        boardLikeRepository.save(boardLike);

        return true;
    }

    // 게시글 - 댓글 상세보기
    @Override
    public BoardDetailDto readAllComments(Long boardId, Long memberId) {
        BoardDetailDto boardDetailDto = new BoardDetailDto();

        // 게시글 DTO 세팅
        Board board = boardRepository.findById(boardId).orElseThrow();
        Member writer = board.getMember();
        BoardDto boardDto = board.toBoardDto();
        Category category = categoryRepository.findByBoard(board).orElseThrow();
        BoardMedia boardMedia = boardMediaRepository.findByBoard(board).orElseThrow();

        CreateMember createUser = CreateMember.builder()
                .nickname(writer.getNickname())
                .image(writer.getMemberProfileImg())
                .rank(memberRankExpRepository.findByMember(writer).orElseThrow().getRank().getName())
                .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(writer.getMemberId(), memberId))
                .build();

        boardDto.setCreateUser(createUser);
        boardDto.setCenterId(category.getCenter().getId());
        boardDto.setCenterName(category.getCenter().getName());
        boardDto.setCenterLevelId(category.getCenterlevel().getId());
        boardDto.setCenterLevelColor(category.getCenterlevel().getColor());
        boardDto.setWallId(category.getWall().getId());
        boardDto.setWallName(category.getWall().getName());
        boardDto.setDifficulty(category.getDifficulty());
        boardDto.setHoldColor(category.getHoldColor());
        boardDto.setMediaPath(boardMedia.getMediaPath());
        boardDetailDto.setBoardDto(boardDto);

        // 댓글 DTO 세팅
        List<Comment> comments = commentRepository.findAllByBoard(board, Sort.by(Sort.Direction.DESC, "createdDateTime"));
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : comments) {

            Member cWriter = comment.getMember();
            CreateMember cCreateMember = CreateMember.builder()
                    .nickname(cWriter.getNickname())
                    .image(cWriter.getMemberProfileImg())
                    .rank(memberRankExpRepository.findByMember(cWriter).orElseThrow().getRank().getName())
                    .isFollow(followRepository.existsByFollowerMemberIdAndFollowingMemberId(cWriter.getMemberId(), memberId))
                    .build();

            CommentDto commentDto = comment.toCommentDto();
            commentDto.setUser(cCreateMember);
            commentDtos.add(commentDto);
        }
        boardDetailDto.setCommentDtos(commentDtos);

        return boardDetailDto;
    }
}
