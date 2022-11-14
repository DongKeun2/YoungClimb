package com.youngclimb.domain.model.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.youngclimb.domain.model.entity.Member;
import org.springframework.scheduling.annotation.Async;

import javax.transaction.Transactional;

public interface FirebaseService {

    public void saveFcmToken(String email, String token);

    public void deleteFcmToken(String email);


}
