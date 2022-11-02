package com.youngclimb.common.model.dto.board;

import com.youngclimb.common.model.dto.member.CreateMember;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CommentDto {
    Long id;
    CreateMember user;
    String content;
    Boolean isLiked;
    String createdAt;
    List<CommentDto> reComment;
}
