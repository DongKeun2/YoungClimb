package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.board.BoardDto;
import com.youngclimb.domain.model.dto.board.BoardSearchDto;
import com.youngclimb.domain.model.dto.member.JoinMember;
import com.youngclimb.domain.model.dto.member.MemberPic;
import com.youngclimb.domain.model.entity.Board;

import java.security.Principal;
import java.util.List;

public interface SearchService {
    List<MemberPic> getMemberRec(String email);
    List<MemberPic> getMemberPic(String nickname);
    List<BoardDto> getBoardPic(BoardSearchDto boardSearchDto, String email);
}
