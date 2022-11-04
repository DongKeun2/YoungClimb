package com.youngclimb.domain.model.dto.member;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginMemberInfo {
    String nickname;
    String intro;
    int height;
    int shoeSize;
    int wingspan;
    String rank;
    //(현재 레벨에서 몇 % 인지),
    int exp;
    //(다음 랭크까지 몇점 남았는지),
    long expleft;
    //(다음 랭크를 위한 푼 문제 수 0~3)
    int upto;
}
