package com.youngclimb.common.model.dto.board;

import com.youngclimb.common.model.entity.Comment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentCreate {

    Long boardId;

    Long memberId;

    String content;

    Long paraentId;

    public Comment toComment() {
        return Comment.builder()
                .content(content)
                .createdDatetime(LocalDateTime.now())
                .isDeleted(false)
                .parentId(paraentId)
                .build();
    }


}
