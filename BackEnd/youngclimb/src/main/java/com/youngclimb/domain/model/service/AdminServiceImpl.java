package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.report.AdminInfo;
import com.youngclimb.domain.model.dto.report.ReportDetailDto;
import com.youngclimb.domain.model.dto.report.ReportDto;
import com.youngclimb.domain.model.dto.report.ReportInfo;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final ReportRepository reportRepository;
    private final BoardMediaRepository boardMediaRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final MemberRankExpRepository memberRankExpRepository;
    private final MemberProblemRepository memberProblemRepository;
    private final CategoryRepository categoryRepository;
    private final RankRepository rankRepository;
    private final CenterLevelRepository centerLevelRepository;

    private final CenterRepository centerRepository;

    // 신고 목록 조회
    public List<ReportDto> readReport(Integer flag) {
        List<Report> reportList = new ArrayList<>();

        if(flag == 4) {
            reportList = reportRepository.findAll();
        } else {
            reportList = reportRepository.findByFlag(flag);
        }

        List<ReportDto> reportDtos = new ArrayList<>();

        List<String> reasons = new ArrayList<>();
        reasons.add("스팸");
        reasons.add("혐오 발언 및 상징");
        reasons.add("상품 판매 등 상업 활동");
        reasons.add("실제 문제 난이도와 게시물상 난이도가 다릅니다");
        reasons.add("풀이를 완료하지 못한 문제를 완료로 표기했습니다");

        for (Report report : reportList) {
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
                            .reportReason(reasons.get(report.getContent() - 1))
                            .build();

                    reportDtos.add(reportDto);
                }
            }
        }

        return reportDtos;
    }

    // 신고 상세 조회
    public ReportDetailDto readReportDetail(Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        BoardMedia boardMedia = boardMediaRepository.findByBoard(report.getBoard()).orElseThrow();
        Category category = categoryRepository.findByBoard(report.getBoard()).orElseThrow();

        List<String> reasons = new ArrayList<>();
        reasons.add("스팸");
        reasons.add("혐오 발언 및 상징");
        reasons.add("상품 판매 등 상업 활동");
        reasons.add("실제 문제 난이도와 게시물상 난이도가 다릅니다");
        reasons.add("풀이를 완료하지 못한 문제를 완료로 표기했습니다");

        ReportDetailDto reportDetailDto = ReportDetailDto.builder()
                .reportId(reportId)
                .reportReason(reasons.get(report.getContent() - 1))
                .boardMedia(boardMedia.getMediaPath())
                .boardId(report.getBoard().getBoardId())
                .boardContent(report.getBoard().getContent())
                .boardLevel(category.getCenterlevel().getColor())
                .memberNickname(report.getMember().getNickname())
                .build();

        return reportDetailDto;
    }

    // 신고한 게시물 삭제
    public void deleteReport(Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();
        Member member = report.getBoard().getMember();
        Category category = categoryRepository.findByBoard(report.getBoard()).orElseThrow();

        // 유저 경험치 등급 저장하기
        // 게시물에서 등급 받아오기
        Level level = category.getCenterlevel().getLevel();

        // 회원 경험치 업데이트
        MemberRankExp memberExp = memberRankExpRepository.findByMember(member).orElseThrow();
        memberExp.reduceMemberExp(level.getExp());

        // 회원 푼 문제 업데이트
        MemberProblem memberProblem = memberProblemRepository.findByMember(member).orElseThrow();
        memberProblem.reduceProblem(level.getRank());
        memberProblemRepository.save(memberProblem);

        // 랭크 업데이트
        List<Rank> ranks = rankRepository.findAll();
        ranks.sort((o1, o2) -> (int) (o1.getQual() - o2.getQual()));

        for (Rank tmp : ranks) {
            if ((memberProblem.findSolvedProblem(tmp.getProblem()) >= 3) && (tmp.getQual() <= memberExp.getMemberExp())) {
                memberExp.setRank(tmp);
                break;
            }
        }
        memberRankExpRepository.save(memberExp);

        report.getBoard().setIsDelete(1);
        boardRepository.save(report.getBoard());
        report.setFlag(1);
        reportRepository.save(report);
    }


    // 신고한 게시물 패스
    public void passReport(Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();

        report.setFlag(1);
        report.getBoard().setIsDelete(0);
        boardRepository.save(report.getBoard());
        reportRepository.save(report);
    }


    // 신고한 게시물 보류
    public void postponeReport(Long reportId) {
        Report report = reportRepository.findById(reportId).orElseThrow();

        report.setFlag(2);
        reportRepository.save(report);
    }

    // 운영정보 조회
    @Override
    public AdminInfo readAdminInfo() {
        AdminInfo adminInfo = new AdminInfo();

        // 일반 현황
        
        adminInfo.setCountCenter(centerRepository.count());
        adminInfo.setCountMember(memberRepository.count());
        adminInfo.setCountBoard(boardRepository.countByIsDeleteNot(1));

        // 신고 현황
        
        List<Report> reportList = reportRepository.findAll();
        
        Long countBefore = 0L;
        Long countIng = 0L;
        Long countCompleted = 0L;
        
        for(Report report : reportList) {
            if(report.getFlag() == 0 ) countBefore ++;
            if(report.getFlag() == 1 ) countCompleted ++;
            if(report.getFlag() == 2 ) countIng ++;
        }
        
        
        ReportInfo reportInfo = ReportInfo.builder()
                .totalReport(reportList.size())
                .countBefore(countBefore)
                .countIng(countIng)
                .countCompleted(countCompleted)
                .build();

        adminInfo.setReportInfo(reportInfo);

        return adminInfo;
    }


}
