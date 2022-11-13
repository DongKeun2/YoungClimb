package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.ReportDto;
import com.youngclimb.domain.model.entity.Report;
import com.youngclimb.domain.model.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{
    private final ReportRepository reportRepository;

//    @Override
//    public List<ReportDto> readReport(String email) {
//        List<Report> reports = reportRepository.findAll();
//
//        return
//    }
}
