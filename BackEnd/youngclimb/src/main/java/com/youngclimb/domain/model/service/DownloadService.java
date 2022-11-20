package com.youngclimb.domain.model.service;

public interface DownloadService {
    // 다운로드 수 제공
    public Integer serveDownload();

    // 다운로드 수 업데이트
    public Integer updateDownload();
}
