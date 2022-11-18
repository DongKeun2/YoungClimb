package com.youngclimb.domain.model.dto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardMediaDto {
    private Long mediaId;
    private String mediaPath;
    private String thumbnatilPath;
}
