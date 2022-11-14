package com.youngclimb.domain.model.dto.board;

import com.youngclimb.domain.model.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreate {

    String content;

    public Comment toComment() {
        return Comment.builder()
                .content(content)
                .createdDateTime(LocalDateTime.now())
                .isDeleted(false)
                .parentId(0L)
                .build();
    }


}
