package com.youngclimb.domain.model.dto.board;

import lombok.Data;

import java.util.List;

@Data
public class BoardDetailDto {
    private BoardDto boardDto;
    private List<CommentDto> commentDtos;
}
