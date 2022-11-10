package com.youngclimb.domain.model.dto.board;

import lombok.Data;

@Data
public class NoticeDto {
    String nickname;
    String profileImage;
    Integer Type;
    Long boardId;
    String createdAt;
}
