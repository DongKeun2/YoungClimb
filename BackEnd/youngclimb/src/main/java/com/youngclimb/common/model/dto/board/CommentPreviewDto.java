package com.youngclimb.common.model.dto.board;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CommentPreviewDto {
    String nickname;
    String comment;
}
