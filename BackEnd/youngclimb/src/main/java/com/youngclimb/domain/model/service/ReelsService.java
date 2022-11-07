package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;

import java.util.List;

public interface ReelsService {

    List<BoardDto> serveReels(String email);
}
