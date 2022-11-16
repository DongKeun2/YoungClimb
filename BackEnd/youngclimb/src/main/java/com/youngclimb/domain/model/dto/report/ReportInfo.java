package com.youngclimb.domain.model.dto.report;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportInfo {
    long totalReport;
    long countBefore;
    long countIng;
    long countCompleted;
}
