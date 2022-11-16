package com.youngclimb.domain.model.dto.report;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportDetailDto {
    Long reportId;
    String memberNickname;
    String reportReason;
    Long boardId;
    String boardMedia;
    String boardContent;
    String boardLevel;
}
