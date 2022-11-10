package com.youngclimb.domain.model.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.youngclimb.domain.model.entity.FcmToken;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.repository.FcmTokenRepository;
import com.youngclimb.domain.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class FirebaseServiceImpl implements FirebaseService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final MemberRepository memberRepository;
    private final FcmTokenRepository fcmTokenRepository;

    // Token 저장
    public void saveFcmToken(String email, String token) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        FcmToken fcmToken = fcmTokenRepository.findByContentAndMember(token, member).orElse(null);

        if (fcmToken == null) {
            FcmToken fcmTokenBuild = FcmToken.builder()
                    .content(token)
                    .member(member)
                    .build();

            fcmTokenRepository.save(fcmTokenBuild);
        }
    }

    // Token 삭제
    public void deleteFcmToken(String email, String token) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        FcmToken fcmToken = fcmTokenRepository.findByContentAndMember(token, member).orElse(null);

        fcmTokenRepository.delete(fcmToken);
    }
//    @Async
//    @Transactional
//    public void sendNotification(Member member, String title, String body, String route) {
//
//        if(member.getFcmToken() == null) {
//            System.out.println("토큰이 존재하지 않습니다.")
//            return ;
//        }
//
//
//        Notification notification = new Notification(title, body);
//
//        Message message = Message.builder()
//                .setNotification(notification)
//                .setToken(member.getFcmToken())
//                .putData("route", route)
//                .build();
//
//        try{
//            String response = FirebaseMessaging.getInstance().send(message);
//
//            NoticeVO notice = NoticeVO.builder()
//                    .user(user)
//                    .content(body)
//                    .route(route)
//                    .state(1)
//                    .title(title)
//                    .build();
//
//            noticeUpdateService.save(notice);
//        }catch (Exception e){
//            log.warn(user.getEmail() + ": 알림 전송에 실패하였습니다.");
//        }
//
//
//    }
//    @Async
//    @Transactional
//    public void sendItemActivatedNotice(Long itemIdx){
//        ItemVO item = itemFindService.findByIdx(itemIdx);
//
//        sendNotification(item.getOwner(),
//                "아이템이 활성화 되었습니다.",
//                "아이템 " + item.getName() + "이 활성화 되었습니다.",
//                "/");
//    }
}
