package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.report.AdminInfo;
import com.youngclimb.domain.model.dto.report.ReportDetailDto;
import com.youngclimb.domain.model.dto.report.ReportDto;

import java.util.List;

public interface AdminService {

    // 신고 목록 조회
    public List<ReportDto> readReport (Integer flag);

    // 신고 상세 조회
    public ReportDetailDto readReportDetail (Long reportId);

    // 신고한 게시물 삭제
    public void deleteReport (Long reportId);

    // 신고한 게시물 패스
    public void passReport (Long reportId);

    // 신고한 게시물 보류
    public void postponeReport (Long reportId);

    public AdminInfo readAdminInfo();
}
