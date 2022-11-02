package com.youngclimb.common.model.service;

import com.youngclimb.common.model.dto.center.CenterDetailDto;
import com.youngclimb.common.model.dto.center.CenterDto;

import java.util.List;

public interface CenterService {

    // 클라이밍장 거리순 조회
    public List<CenterDto> distanceCenters(Float lat, Float lon);

    // 클라이밍장 상세 정보 조회
    public CenterDetailDto readCenterDetail(Integer centerId);
}
