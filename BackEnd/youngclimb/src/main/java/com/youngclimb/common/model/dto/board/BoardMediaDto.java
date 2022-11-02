package com.youngclimb.common.model.dto.board;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardMediaDto {
    private Long mediaId;
    private String mediaPath;
}
