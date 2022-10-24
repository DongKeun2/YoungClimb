package com.youngclimb.domain.model.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    GUEST("ROLE_USER","일반 사용자"),
    MANAGER("ROLE_MANAGER", "클라이밍센터 매니저"),
    ADMINISTRATOR("ROLE_ADMINISTRATOR", "시스템 관리자");

    private final String key;
    private final String title;

}
