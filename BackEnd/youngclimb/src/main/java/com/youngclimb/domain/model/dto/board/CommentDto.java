package com.youngclimb.domain.model.dto.board;

import com.youngclimb.domain.model.dto.member.CreateMember;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class CommentDto {
    Long id;
    CreateMember user;
    String content;
    Boolean isLiked;
    LocalDateTime createdAt;
    List<CommentDto> reComments;
}
