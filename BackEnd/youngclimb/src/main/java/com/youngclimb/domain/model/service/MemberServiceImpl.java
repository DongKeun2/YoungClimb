package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.youngclimb.common.exception.ResourceNotFoundException;
import com.youngclimb.common.jwt.JwtTokenProvider;
import com.youngclimb.domain.model.dto.member.*;
import com.youngclimb.domain.model.entity.Follow;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.entity.MemberRankExp;
import com.youngclimb.domain.model.entity.UserRole;
import com.youngclimb.domain.model.repository.FollowRepository;
import com.youngclimb.domain.model.repository.MemberRankExpRepository;
import com.youngclimb.domain.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityExistsException;
import java.io.IOException;
import java.io.InputStream;
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
    private final AmazonS3 amazonS3;


    // 이메일 중복 체크
    @Override
    public boolean checkEmailDuplicate(String email) {
        return !memberRepository.existsByEmail(email);
    }

    // 닉네임 중복 체크
    @Override
    public boolean checkNicknameDuplicate(String nickname) {
        return !memberRepository.existsByNickname(nickname);
    }

    // 회원 등록
    @Override
    public String insertUser(JoinMember joinMember) throws Exception {
        String role = "GUEST";

        if (memberRepository.existsByEmail(joinMember.getEmail())) {
            throw new EntityExistsException("중복된 이메일입니다!");
        }

        if (!isEmail(joinMember.getEmail())) {
            throw new Exception("이메일 형식이 틀렸습니다.");
        }

        if (memberRepository.existsByNickname(joinMember.getEmail())) {
            throw new EntityExistsException("중복된 닉네임입니다!");
        }

        Member member = Member.builder()
                .email(joinMember.getEmail())
                .pw(passwordEncoder.encode(joinMember.getPassword()))
                .nickname(joinMember.getNickname())
                .gender(joinMember.getGender())
                .joinDate(joinMember.getJoinDate())
                .height(joinMember.getHeight())
                .shoeSize(joinMember.getShoeSize())
                .wingspan(joinMember.getWingspan())
                .role(UserRole.GUEST)
                .build();
        memberRepository.save(member);

        jwtTokenProvider.createRefreshToken(member.getEmail());
        return jwtTokenProvider.createAccessToken(member.getEmail());
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
    public void addProfile(MemberProfile memberProfile, MultipartFile file) throws Exception {
        Member member = memberRepository.findByEmail(memberProfile.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", memberProfile.getEmail()));

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
    public void editProfile(MemberInfo memberInfo, MultipartFile file) throws Exception {
        Member member = memberRepository.findByEmail(memberInfo.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", memberInfo.getEmail()));

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
    public String login(LoginMember member) {
        Member loginMember = memberRepository.findByEmail(member.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Member", "memberEmail", member.getEmail()));
        if (!passwordEncoder.matches(member.getPassword(), loginMember.getPw())) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }
        jwtTokenProvider.createRefreshToken(member.getEmail());
        return jwtTokenProvider.createAccessToken(member.getEmail());
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
    public Boolean addCancelFollow(String followingNickname) {
        long followerId = 1;
        Member follower = memberRepository.findById(followerId).orElseThrow();
        Member following = memberRepository.findByNickname(followingNickname).orElseThrow();

        if (follower == following) {
            return Boolean.FALSE;
        }

        Follow follow = followRepository.findByFollowerAndFollowing(follower, following).orElse(null);

        if (follow == null) {
            Follow followBuild = Follow.builder()
                    .follower(follower)
                    .following(following)
                    .build();
            followRepository.save(followBuild);

            return Boolean.TRUE;
        } else {
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

        for (Follow following: followingMembers) {
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

        for (Follow follower: followerMembers) {
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

}
