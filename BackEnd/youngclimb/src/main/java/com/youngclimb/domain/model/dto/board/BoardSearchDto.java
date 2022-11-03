package com.youngclimb.domain.model.dto.board;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardSearchDto {
    Integer center;
    Integer wall;
    String level;
    String holdColor;
    boolean isSimilar;
}
