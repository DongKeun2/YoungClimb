package com.youngclimb.domain.model.dto.board;

import lombok.Data;

import java.util.List;

@Data
public class MainPageDto {
    List<BoardDto> boardDtos;
    boolean nextPage;
}
