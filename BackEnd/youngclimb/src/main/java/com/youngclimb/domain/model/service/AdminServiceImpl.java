package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.report.ReportDetailDto;
import com.youngclimb.domain.model.dto.report.ReportDto;
import com.youngclimb.domain.model.entity.BoardMedia;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.entity.Report;
import com.youngclimb.domain.model.repository.BoardMediaRepository;
import com.youngclimb.domain.model.repository.BoardRepository;
import com.youngclimb.domain.model.repository.MemberRankExpRepository;
import com.youngclimb.domain.model.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final ReportRepository reportRepository;
    private final BoardMediaRepository boardMediaRepository;
    private final BoardRepository boardRepository;
    private final MemberRankExpRepository memberRankExpRepository;


    // 신고 목록 조회
    public List<ReportDto> readReport (String email) {
        List<Report> reportList = reportRepository.findAll();
        List<ReportDto> reportDtos = new ArrayList<>();

        List<String> reasons = new ArrayList<>();
        reasons.add("스팸");
        reasons.add("혐오 발언 및 상징");
        reasons.add("상품 판매 등 상업 활동");
        reasons.add("실제 문제 난이도와 게시물상 난이도가 다릅니다");
        reasons.add("풀이를 완료하지 못한 문제를 완료로 표기했습니다");

        for (Report report: reportList) {
            if (report.getFlag() != 1) {
                if (report.getBoard().getIsDelete() == 1) {
                    report.setFlag(1);
                    reportRepository.save(report);
                } else {
                    ReportDto reportDto = ReportDto.builder()
                            .reportId(report.getId())
                            .boardId(report.getBoard().getBoardId())
                            .memberNickname(report.getMember().getNickname())
                            .treated(report.getFlag())
                            .reportReason(reasons.get(report.getContent()-1))
                            .build();

                    reportDtos.add(reportDto);
                }
            }
        }

        return reportDtos;
    }

    // 신고 상세 조회
    public ReportDetailDto readReportDetail (Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        BoardMedia boardMedia = boardMediaRepository.findByBoard(report.getBoard()).orElseThrow();

        List<String> reasons = new ArrayList<>();
        reasons.add("스팸");
        reasons.add("혐오 발언 및 상징");
        reasons.add("상품 판매 등 상업 활동");
        reasons.add("실제 문제 난이도와 게시물상 난이도가 다릅니다");
        reasons.add("풀이를 완료하지 못한 문제를 완료로 표기했습니다");

        ReportDetailDto reportDetailDto = ReportDetailDto.builder()
                .reportId(reportId)
                .reportReason(reasons.get(report.getContent()-1))
                .boardMedia(boardMedia.getMediaPath())
                .boardId(report.getBoard().getBoardId())
                .boardContent(report.getBoard().getContent())
                .memberNickname(report.getMember().getNickname())
                .build();

        return reportDetailDto;
    }

    // 신고한 게시물 삭제
    public void deleteReport (Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        Member member = report.getMember();


        report.getBoard().setIsDelete(1);
        boardRepository.save(report.getBoard());
        report.setFlag(1);
        reportRepository.save(report);
    }


    // 신고한 게시물 패스
    public void passReport (Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();

        report.setFlag(1);
        report.getBoard().setIsDelete(0);
        boardRepository.save(report.getBoard());
        reportRepository.save(report);
    }


    // 신고한 게시물 보류
    public void postponeReport (Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();

        report.setFlag(2);
        reportRepository.save(report);
    }


}
