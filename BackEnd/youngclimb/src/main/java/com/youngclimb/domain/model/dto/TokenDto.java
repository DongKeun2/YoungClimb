package com.youngclimb.domain.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenDto {
    String accessToken;
    String refreshToken;
}
