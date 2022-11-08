package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface ReelsService {

    List<BoardDto> serveReels(String email, Pageable pageable);
}
