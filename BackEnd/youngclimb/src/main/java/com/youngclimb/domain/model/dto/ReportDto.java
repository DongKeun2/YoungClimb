package com.youngclimb.domain.model.dto;

import lombok.Data;

@Data
public class ReportDto {
    Long reportId;
    String memberNickname;
    String reportReason;
    Long boardId;
    Integer treated;
}
