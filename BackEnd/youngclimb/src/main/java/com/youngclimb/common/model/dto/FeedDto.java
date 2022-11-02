package com.youngclimb.common.model.dto;

import com.youngclimb.common.model.dto.board.BoardDto;
import com.youngclimb.common.model.dto.board.CommentDto;
import com.youngclimb.common.model.dto.board.BoardMediaDto;
import lombok.Data;

import java.util.List;

@Data
public class FeedDto {
    private BoardDto boardDto;
    private List<BoardMediaDto> boardMediaDtos;
    private boolean isBoardLiked;
    private CommentDto commentDto;
}
