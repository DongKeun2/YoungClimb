package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.center.CenterDetailDto;
import com.youngclimb.domain.model.dto.center.CenterDto;

import java.util.List;

public interface CenterService {

    // 클라이밍장 거리순 조회
    public List<CenterDto> distanceCenters(Float lat, Float lon);

    // 클라이밍장 상세 정보 조회
    public CenterDetailDto readCenterDetail(Integer centerId);
}
