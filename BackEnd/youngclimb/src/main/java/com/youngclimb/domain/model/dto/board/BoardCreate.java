package com.youngclimb.domain.model.dto.board;

import com.youngclimb.domain.model.entity.Board;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class BoardCreate {
    String userEmail;
    LocalDateTime createdAt;
    Long centerId;
    Long centerLevelId;
    Long mediaId;
    Long wallId;
    String level;
    String holdColor;
    LocalDate solvedDate;
    String content;

    public Board toBoard() {
        return Board.builder()
                .content(content)
                .createdDateTime(createdAt)
                .solvedDate(solvedDate)
                .isDelete(false)
                .boardView(0L)
                .build();
    }
}
