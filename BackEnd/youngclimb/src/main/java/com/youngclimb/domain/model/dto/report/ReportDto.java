package com.youngclimb.domain.model.dto.report;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportDto {
    Long reportId;
    String memberNickname;
    String reportReason;
    Long boardId;
    Integer treated;
}
