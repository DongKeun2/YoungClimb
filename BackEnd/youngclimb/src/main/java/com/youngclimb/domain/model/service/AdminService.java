package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.report.*;

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
    // 게시글 관리 정보
    public AdminInfo readAdminInfo();

    // 관리자 지점 정보
    public List<AdminCenterDto> adminCenter();

    public AdminCenterDetail adminCenterDetail(Integer centerId);

    // 관리자 지점 정보 상세
    public List<AdminUserDto> adminUser();
    // 관리자 유저 삭제
    public void adminDeleteUser(Long userId);

    // 관리자 유저 정보
}
