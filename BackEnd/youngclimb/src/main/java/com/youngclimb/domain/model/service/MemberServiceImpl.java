package com.youngclimb.domain.model.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.youngclimb.common.jwt.JwtTokenProvider;
import com.youngclimb.domain.model.dto.member.JoinMember;
import com.youngclimb.domain.model.dto.member.LoginMember;
import com.youngclimb.domain.model.dto.member.MemberInfo;
import com.youngclimb.domain.model.entity.Member;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final AmazonS3Client amazonS3Client;


    // 이메일 중복 체크
    @Override
    public boolean checkEmailDuplicate(String email) {
        return memberRepository.existsByEmail(email);
    }

    // 닉네임 중복 체크
    @Override
    public boolean checkNicknameDuplicate(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    // 회원 등록
    @Override
    public String insertUser(JoinMember joinMember) throws Exception {
        String role = "GUEST";

        if(memberRepository.existsByEmail(joinMember.getEmail())) {
            throw new EntityExistsException("중복된 이메일입니다!");
        }

        if(memberRepository.existsByNickname(joinMember.getEmail())) {
            throw  new EntityExistsException("중복된 닉네임입니다!");
        }

        Member member = Member.builder()
                .email(joinMember.getEmail())
                .pw(passwordEncoder.encode(joinMember.getPassword()))
                .nickname(joinMember.getNickname())
                .gender(joinMember.getGender())
                .height(joinMember.getHeight())
                .shoesize(joinMember.getShoeSize())
                .wingspan(joinMember.getWingspan())
                .build();
        memberRepository.save(member);

        jwtTokenProvider.createRefreshToken(member.getEmail());
        return jwtTokenProvider.createAccessToken(member.getEmail());
    }

    // 회원정보 추가 또는 수정
    @Override
    public void addUserInfo(String email, MultipartFile file) throws Exception {
        Member member = memberRepository.findByEmail(email);

        // 프로필 사진 저장
        if(file == null) {
            System.out.println("사진이 없습니다.");
        } else {

            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try(InputStream inputStream = file.getInputStream()) {
                amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
            }
        }
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try{
            return  fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일입니다");
        }
    }


    @Override
    public MemberInfo getUserInfoByUserId(String userId) {
        return null;
    }

    @Override
    public void verifyUser(String email, String password) {

    }

    @Override
    public String changePassword(String userId, String password) {
        return null;
    }

    @Override
    public String deleteMember(String email) {
        return null;
    }

    @Override
    public String login(LoginMember member) {
        return null;
    }
}
