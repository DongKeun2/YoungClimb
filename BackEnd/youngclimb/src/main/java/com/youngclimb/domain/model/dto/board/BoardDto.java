package com.youngclimb.domain.model.dto.board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
