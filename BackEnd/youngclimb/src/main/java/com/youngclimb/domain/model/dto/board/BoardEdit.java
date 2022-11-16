package com.youngclimb.domain.model.dto.board;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardEdit {

    Long boardId;
    String content;
}
