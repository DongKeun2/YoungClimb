package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.DownloadDto;
import com.youngclimb.domain.model.entity.Download;
import com.youngclimb.domain.model.repository.DownloadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DownloadServiceImpl implements DownloadService {

    private final DownloadRepository downloadRepository;

    public Integer updateDownload() {
        Download download = downloadRepository.findById(1).orElse(new Download(1, 0));

        downloadRepository.save(download.addCount());
        DownloadDto downloadDto = new DownloadDto();
        downloadDto.setDownload(download.getDownload());

        return downloadDto.getDownload();
    }
}
