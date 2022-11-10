package com.youngclimb.domain.model.dto.board;

import com.youngclimb.domain.model.entity.Board;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class BoardCreate {
    Integer centerId;
    Integer centerLevelId;
    String mediaPath;
    Integer wallId;
    String level;
    String holdColor;
    LocalDate solvedDate;
    String content;

    public Board toBoard() {
        return Board.builder()
                .content(content)
                .createdDateTime(LocalDateTime.now())
                .solvedDate(solvedDate)
                .boardView(Long.valueOf(0))
                .isDelete(0)
                .build();
    }
}
