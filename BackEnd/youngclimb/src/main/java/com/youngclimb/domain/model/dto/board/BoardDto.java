package com.youngclimb.domain.model.dto.board;

import com.youngclimb.domain.model.dto.member.CreateMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardDto {
    Long id;
    CreateMember createUser;
    String createdAt;
    Integer centerId;
    String centerName;
    Integer centerLevelId;
    String centerLevelColor;
    String mediaPath;
    Integer wallId;
    String wallName;
    String difficulty;
    String holdColor;
    LocalDate solvedDate;
    String content;
    Long like;
    Long view;
    Boolean isLiked;
    Boolean isScrap;
    Long commentNum;
    CommentPreviewDto commentPreview;
    LocalDateTime createdDateTime;
}
