package com.youngclimb.domain.model.dto.board;

import com.youngclimb.domain.model.dto.member.MemberPic;

import java.time.LocalDate;
import java.util.List;

public class CommentDto {
    Long id;
    MemberPic user;
    String content;
    Boolean isLiked;
    LocalDate createdDate;
    List<CommentDto> reComments;
}
