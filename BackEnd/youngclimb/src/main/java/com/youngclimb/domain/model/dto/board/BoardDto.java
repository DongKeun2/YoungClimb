package com.youngclimb.domain.model.dto.board;

import java.time.LocalDate;

public class BoardDto {
    Long id;
    String createUser;
    String createdAt;
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
    Boolean isFollow;
    Boolean isLiked;
    Boolean isScrap;
    Long commentNum;
    CommentPreviewDto commentPreviewDto;

}
