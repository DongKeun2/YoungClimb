package com.youngclimb.domain.model.dto.board;

import com.youngclimb.domain.model.entity.Board;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class BoardCreate {
    Long memberId;
    Integer centerId;
    Integer centerLevelId;
    Long mediaId;
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
                .build();
    }
}
