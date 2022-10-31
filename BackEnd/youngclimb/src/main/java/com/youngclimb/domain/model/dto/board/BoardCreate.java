package com.youngclimb.domain.model.dto.board;

import com.youngclimb.domain.model.entity.Board;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BoardCreate {
    Long id;
    String createUser;
    LocalDateTime createdAt;
    Long centerId;
    String centerName;
    Long centerLevelId;
    String centerLevelColor;
    Long mediaId;
    Long wallId;
    String wallName;
    String difficulty;
    String holdColor;
    LocalDate solvedDate;
    String content;
    Long like;
    Long view;
    Long commentNum;

    public Board toBoard() {
        return Board.builder()
                .boardId(id)
                .content(content)
                .createdDateTime(createdAt)
                .solvedDate(solvedDate)
                .isDelete(false)
                .boardView(0L)
                .build();
    }
}
