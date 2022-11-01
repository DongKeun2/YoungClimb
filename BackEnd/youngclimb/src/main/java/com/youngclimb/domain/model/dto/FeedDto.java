package com.youngclimb.domain.model.dto;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.CommentDto;
import com.youngclimb.domain.model.dto.board.BoardMediaDto;
import lombok.Data;

import java.util.List;

@Data
public class FeedDto {
    private BoardDto boardDto;
    private List<BoardMediaDto> boardMediaDtos;
    private boolean isBoardLiked;
    private CommentDto commentDto;
}
