package com.youngclimb.domain.model.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.scheduling.annotation.Async;

import javax.transaction.Transactional;

public class FirebaseService {
    @Async
    @Transactional
    public void sendNotification(Member member, String title, String body, String route) {

        if(member.getFcmToken() == null) {
            return;
        }


        Notification notification = new Notification(title, body);

        Message message = Message.builder()
                .setNotification(notification)
                .setToken(member.getFcmToken())
                .putData("route", route)
                .build();

        try{
            String response = FirebaseMessaging.getInstance().send(message);

            NoticeVO notice = NoticeVO.builder()
                    .user(user)
                    .content(body)
                    .route(route)
                    .state(1)
                    .title(title)
                    .build();

            noticeUpdateService.save(notice);
        }catch (Exception e){
            log.warn(user.getEmail() + ": 알림 전송에 실패하였습니다.");
        }


    }
    @Async
    @Transactional
    public void sendItemActivatedNotice(Long itemIdx){
        ItemVO item = itemFindService.findByIdx(itemIdx);

        sendNotification(item.getOwner(),
                "아이템이 활성화 되었습니다.",
                "아이템 " + item.getName() + "이 활성화 되었습니다.",
                "/");
    }
}
