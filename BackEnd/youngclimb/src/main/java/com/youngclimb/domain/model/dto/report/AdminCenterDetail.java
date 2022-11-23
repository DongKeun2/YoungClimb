package com.youngclimb.domain.model.dto.report;

import lombok.Data;

import java.util.List;

@Data
public class AdminCenterDetail {

    Integer centerId;

    String centerName;

    List<CenterBoardDetail> centerBoardDetailList;
}
