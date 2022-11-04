package com.youngclimb.domain.model.dto.member;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResDto {
    String accessToken;
    String refreshToken;
    LoginMemberInfo user;
}
