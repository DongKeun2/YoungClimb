package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.youngclimb.common.exception.ResourceNotFoundException;
import com.youngclimb.common.jwt.JwtTokenProvider;
import com.youngclimb.domain.model.dto.board.NoticeDto;
import com.youngclimb.domain.model.dto.member.*;
import com.youngclimb.domain.model.entity.*;
import com.youngclimb.domain.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import reactor.util.annotation.Nullable;

import javax.persistence.EntityExistsException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final MemberRankExpRepository memberRankExpRepository;
    private final RankRepository rankRepository;
    private final MemberProblemRepository memberProblemRepository;
    private final NoticeRepository noticeRepository;
    private final AmazonS3 amazonS3;


    // 이메일 중복 체크
    @Override
    public boolean checkEmailDuplicate(MemberEmail email) {
        return !memberRepository.existsByEmail(email.getEmail());
    }

    // 닉네임 중복 체크
    @Override
    public boolean checkNicknameDuplicate(MemberNickname nickname) {
        return !memberRepository.existsByNickname(nickname.getNickname());
    }

    // 회원 등록
    @Override
    public LoginResDto insertUser(JoinMember joinMember) throws Exception {
        if (memberRepository.existsByEmail(joinMember.getEmail())) {
            System.out.println("중복된 이메일");
            throw new EntityExistsException("중복된 이메일입니다!");
        }

        if (!isEmail(joinMember.getEmail())) {
            System.out.println("이메일 형식");
            throw new Exception("이메일 형식이 틀렸습니다.");
        }

        if (memberRepository.existsByNickname(joinMember.getNickname())) {
            System.out.println("중복된 닉네임");
            throw new EntityExistsException("중복된 닉네임입니다!");
        }

        Member member = Member.builder()
                .email(joinMember.getEmail())
                .pw(passwordEncoder.encode(joinMember.getPassword()))
                .nickname(joinMember.getNickname())
                .gender(joinMember.getGender())
                .joinDate(LocalDate.now())
                .height(joinMember.getHeight())
                .shoeSize(joinMember.getShoeSize())
                .wingspan(joinMember.getWingspan())
                .wingheight(joinMember.getHeight() + joinMember.getWingspan())
                .role(UserRole.USER)
                .build();
        if (member == null) System.out.println("멤버 빌드 실패");
        memberRepository.save(member);

        LoginMemberInfo user = LoginMemberInfo.builder()
                .nickname(member.getNickname())
                .intro(member.getProfileContent())
                .height(member.getHeight())
                .shoeSize(member.getShoeSize())
                .wingspan(member.getWingspan())
                .build();

        MemberRankExp memberRankExp = MemberRankExp.builder()
                .member(member)
                .memberExp(0L)
                .rank(rankRepository.findByName("Y1").orElse(new Rank()))
                .build();
        memberRankExpRepository.save(memberRankExp);

        MemberProblem memberProblem = MemberProblem.builder()
                .member(member)
                .vB(0).v1(0).v2(0).v3(0).v4(0).v5(0).v6(0).v7(0).v8(0)
                .build();
        memberProblemRepository.save(memberProblem);

        LoginResDto loginResDto = LoginResDto.builder()
                .refreshToken(jwtTokenProvider.createRefreshToken(member.getEmail()))
                .accessToken(jwtTokenProvider.createAccessToken(member.getEmail()))
                .user(user)
                .build();

        return loginResDto;
    }

    // 신체정보 추가 또는 수정
//    @Override
//    public void addBodyInfo(MemberInfo memberInfo) throws Exception {
//        Member member = memberRepository.findByEmail(memberInfo.getEmail())
//                .orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", memberInfo.getEmail()));
//        member.addBodyInfo(memberInfo);
//        memberRepository.save(member);
//    }

    // 프로필 추가
    @Override
    public void addProfile(String email, MemberProfile memberProfile, MultipartFile file) throws Exception {

        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", memberProfile.getEmail()));

//        Member member = memberRepository.findByEmail(memberProfile.getEmail())
//                .orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", memberProfile.getEmail()));

        // 프로필 사진 s3 저장
        if (file == null) {
            memberProfile.setImage("https://youngclimb.s3.ap-northeast-2.amazonaws.com/userProfile/KakaoTalk_20221108_150615819.png");
        } else {
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            System.out.println(fileName);
            try (InputStream inputStream = file.getInputStream()) {
//                amazonS3.putObject(bucket+"/userProfile", fileName, inputStream, objectMetadata);
                amazonS3.putObject(new PutObjectRequest(bucket + "/userProfile", fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
                memberProfile.setImage(amazonS3.getUrl(bucket + "/userProfile", fileName).toString());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
        }

        // 프로필 수정
        member.updateMemberImg(memberProfile);
        memberRepository.save(member);
    }

    // 프로필 수정
    @Override
    public void editProfile(String email, MemberInfo memberInfo, @Nullable MultipartFile file) throws Exception {
        System.out.println(memberInfo);


        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", memberInfo.getEmail()));
//        Member member = memberRepository.findByEmail(memberInfo.getEmail())
//                .orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", memberInfo.getEmail()));

        // 프로필 사진 s3 저장
        if (file == null) {
            System.out.println("사진이 없습니다.");
        } else {
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            System.out.println(fileName);
            try (InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket + "/userProfile", fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
                memberInfo.setImage(amazonS3.getUrl(bucket + "/userProfile", fileName).toString());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
        }
        member.updateProfile(memberInfo);
        memberRepository.save(member);
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일입니다");
        }
    }


    @Override
    public void verifyUser(String email, String password) {

    }

    @Override
    public String changePassword(String userId, String password) {
        return null;
    }

    @Override
    public void deleteMember(String email) {


    }

    @Override
    public LoginResDto login(LoginMember member) {
        Member loginMember = memberRepository.findByEmail(member.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", member.getEmail()));
        if (!passwordEncoder.matches(member.getPassword(), loginMember.getPw())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        MemberRankExp memberRankExp = memberRankExpRepository.findByMember(loginMember).orElseThrow();

        LoginResDto loginResDto = LoginResDto.builder()
                .accessToken(jwtTokenProvider.createAccessToken(member.getEmail()))
                .refreshToken(jwtTokenProvider.createRefreshToken(member.getEmail()))
                .build();


//        memberRankExp.getRank().getProblem();

        MemberProblem memberProblem = memberProblemRepository.findByMember(loginMember).orElseThrow();


        int problemLeft = 0;
        switch (memberRankExp.getRank().getProblem()) {
            case "V0":
                problemLeft = (3 > memberProblem.getV0()) ? memberProblem.getV0() : 3;
                break;
            case "V1":
                problemLeft = (3 > memberProblem.getV1()) ? memberProblem.getV1() : 3;
                break;
            case "V3":
                problemLeft = (3 > memberProblem.getV3()) ? memberProblem.getV3() : 3;
                break;
            case "V5":
                problemLeft = (3 > memberProblem.getV5()) ? memberProblem.getV5() : 3;
                break;
            case "V6":
                problemLeft = (3 > memberProblem.getV6()) ? memberProblem.getV6() : 3;
                break;
            case "V7":
                problemLeft = (3 > memberProblem.getV7()) ? memberProblem.getV7() : 3;
                break;
            default:
                problemLeft = 0;
                break;
        }

        long expLeft = memberRankExp.getRank().getQual() - memberRankExp.getMemberExp();

        LoginMemberInfo loginMem = LoginMemberInfo.builder()
                .nickname(loginMember.getNickname())
                .intro(loginMember.getProfileContent())
                .height(loginMember.getHeight())
                .shoeSize(loginMember.getShoeSize())
                .wingspan(loginMember.getWingspan())
                .rank(memberRankExp.getRank().getName())
                .exp((int) (expLeft * 100 / memberRankExp.getRank().getQual()))
                .expleft(expLeft)
                .upto(problemLeft)
                .build();
        loginResDto.setUser(loginMem);

        return loginResDto;
    }

    // 로그아웃
    @Override
    public void logout(String email, String accessToken) {

        jwtTokenProvider.logout(email, accessToken);
    }

    // 이메일 유효성 검사
    public boolean isEmail(String str) {
        return Pattern.matches("^[a-z0-9A-Z._-]*@[a-z0-9A-Z]*.[a-zA-Z.]*$", str);
    }

    // 비밀번호 유효성 검사

    public static String isValidPassword(String password) {
        // 최소 8자 상수 선언
        final int MIN = 8;

        // 영어, 숫자, 특수문자 포함한 MIN to MAX 글자 정규식
        final String REGEX =
                "^((?=.*\\d)(?=.*[a-zA-Z])(?=.*[\\W]).{" + MIN + "," + "})$";
        // 공백 문자 정규식
        final String BLANKPT = "(\\s)";

        // 정규식 검사객체
        Matcher matcher;

        // 공백 체크
        if (password == null || "".equals(password)) {
            return "Detected: No Password";
        }

        // ASCII 문자 비교를 위한 UpperCase
        String tmpPw = password.toUpperCase();
        // 문자열 길이
        int strLen = tmpPw.length();

        // 글자 길이 체크
        if (strLen < 8) {
            return "Detected: Incorrect Length(Length: " + strLen + ")";
        }

        // 공백 체크
        matcher = Pattern.compile(BLANKPT).matcher(tmpPw);
        if (matcher.find()) {
            return "Detected: Blank";
        }

        // 비밀번호 정규식 체크
        matcher = Pattern.compile(REGEX).matcher(tmpPw);
        if (!matcher.find()) {
            return "Detected: Wrong Regex";
        }
        return "";
    }

    // 팔로잉하기/취소하기
    public Boolean addCancelFollow(String followingNickname, String followerEmail) {
        Member following = memberRepository.findByNickname(followingNickname).orElseThrow();
        Member follower = memberRepository.findByEmail(followerEmail).orElseThrow();
        Notice notice = noticeRepository.findByToMemberAndFromMemberAndType(following, follower, 1).orElse(null);

        if (follower.getMemberId() == following.getMemberId()) {
            return Boolean.FALSE;
        }

        Follow follow = followRepository.findByFollowerAndFollowing(follower, following).orElse(null);

        if (follow == null) {
            Follow followBuild = Follow.builder()
                    .follower(follower)
                    .following(following)
                    .build();
            followRepository.save(followBuild);

            Notice noticeBuild = Notice.builder()
                    .toMember(following)
                    .fromMember(follower)
                    .type(1)
                    .board(null)
                    .createdDateTime(LocalDateTime.now())
                    .build();
            noticeRepository.save(noticeBuild);


            return Boolean.TRUE;
        } else {
            noticeRepository.delete(notice);
            followRepository.delete(follow);
            return Boolean.FALSE;
        }
    }

    // 팔로잉 팔로워 목록 읽기
    public FollowMemberList listFollow(String nickname) {
        Member member = memberRepository.findByNickname(nickname).orElseThrow();
        FollowMemberList followMemberList = new FollowMemberList();

        List<FollowMemberDto> follwings = new ArrayList<>();
        List<FollowMemberDto> follwers = new ArrayList<>();

        List<Follow> followingMembers = followRepository.findAllByFollower(member);
        List<Follow> followerMembers = followRepository.findAllByFollowing(member);

        for (Follow following : followingMembers) {
            Member followingMember = following.getFollowing();
            MemberRankExp memberRankExp = memberRankExpRepository.findByMember(followingMember).orElseThrow();

            FollowMemberDto myFollowing = new FollowMemberDto();

            myFollowing.setNickname(followingMember.getNickname());
            myFollowing.setGender(followingMember.getGender());
            myFollowing.setImage(followingMember.getMemberProfileImg());
            myFollowing.setHeight(followingMember.getHeight());
            myFollowing.setWingspan(followingMember.getWingspan());
            myFollowing.setShoeSize(followingMember.getShoeSize());
            myFollowing.setRank(memberRankExp.getRank().getName());

            follwings.add(myFollowing);
        }

        for (Follow follower : followerMembers) {
            Member followerMember = follower.getFollower();
            MemberRankExp memberRankExp = memberRankExpRepository.findByMember(followerMember).orElseThrow();

            FollowMemberDto myFollower = new FollowMemberDto();
            myFollower.setNickname(followerMember.getNickname());
            myFollower.setGender(followerMember.getGender());
            myFollower.setImage(followerMember.getMemberProfileImg());
            myFollower.setHeight(followerMember.getHeight());
            myFollower.setWingspan(followerMember.getWingspan());
            myFollower.setShoeSize(followerMember.getShoeSize());
            myFollower.setRank(memberRankExp.getRank().getName());

            follwers.add(myFollower);
        }

        followMemberList.setFollowers(follwers);
        followMemberList.setFollowings(follwings);

        return followMemberList;
    }

    // 알림 목록 읽기
    public List<NoticeDto> readNotice(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        List<Notice> noticeList = noticeRepository.findAllByToMember(member);
        List<NoticeDto> noticeDtos = new ArrayList<>();

        for (Notice notice : noticeList) {
            NoticeDto noticeDto = new NoticeDto();
            LocalDateTime createdTime = notice.getCreatedDateTime();

            String timeText = createdTime.getYear() + "년 " + createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
            Long minus = ChronoUnit.MINUTES.between(createdTime, LocalDateTime.now());
            if (minus <= 10) {
                timeText = "방금 전";
            } else if (minus <= 60) {
                timeText = minus + "분 전";
            } else if (minus <= 1440) {
                timeText = ChronoUnit.HOURS.between(createdTime, LocalDateTime.now()) + "시간 전";
            } else if (ChronoUnit.YEARS.between(createdTime, LocalDateTime.now()) > 1) {
                timeText = createdTime.getMonth() + "월 " + createdTime.getDayOfMonth() + "일";
            }

            if (notice.getType() == 1) {
                noticeDto.setBoardId(null);
            } else {
                noticeDto.setBoardId(notice.getBoard().getBoardId());
            }

            noticeDto.setProfileImage(notice.getFromMember().getMemberProfileImg());
            noticeDto.setNickname(notice.getFromMember().getNickname());
            noticeDto.setType(notice.getType());
            noticeDto.setCreatedAt(timeText);

            noticeDtos.add(noticeDto);
        }

        return noticeDtos;
    }


}
