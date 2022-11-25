package com.youngclimb.domain.model.dto.report;

import com.youngclimb.domain.model.dto.LevelboardCount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AdminInfo {
    long countCenter;
    long countMember;
    long countBoard;

    List<LevelboardCount> levelboardCount;

    ReportInfo reportInfo;
    List<ReportDto> beforeList;
    List<ReportDto> recentList;
    List<ReportDto> suspendedList;

}
