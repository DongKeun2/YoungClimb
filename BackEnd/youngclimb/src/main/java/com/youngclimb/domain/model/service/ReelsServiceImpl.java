package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReelsServiceImpl implements ReelsService {
    private final MemberRepository memberRepository;

    public List<BoardDto> serveReels(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<BoardDto> boardDtos = new ArrayList<>();

        return boardDtos;
    }
}
