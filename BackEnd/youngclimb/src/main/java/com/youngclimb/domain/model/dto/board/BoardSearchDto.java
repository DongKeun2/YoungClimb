package com.youngclimb.domain.model.dto.board;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardSearchDto {
    Integer center;
    Integer wall;
    Integer level;
    String holdColor;
    boolean isSimilar;

    public boolean getIsSimilar() {
        return this.isSimilar;
    }
}
