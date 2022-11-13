package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.MainPageDto;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface ReelsService {

    MainPageDto serveReels(String email, Pageable pageable);
}
