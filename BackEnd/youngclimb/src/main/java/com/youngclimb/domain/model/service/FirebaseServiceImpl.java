package com.youngclimb.domain.model.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.youngclimb.domain.model.entity.Member;
import com.youngclimb.domain.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FirebaseServiceImpl implements FirebaseService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private FirebaseMessaging instance;

    private final MemberRepository memberRepository;


    // Token 저장
    public void saveFcmToken(String email, String token) {
        Member member = memberRepository.findByEmail(email).orElseThrow();

        member.setFcmToken(token);
        memberRepository.save(member);
    }


    // Token 삭제
    public void deleteFcmToken(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow();
        member.setFcmToken(null);

        memberRepository.save(member);
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
