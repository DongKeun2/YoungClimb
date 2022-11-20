package com.youngclimb.domain.model.dto.member;

import lombok.Data;

@Data
public class UserDto {
    public String image;
    public String nickname;
    public String gender;
    public String intro;
    public String rank;

    public Integer height;
    public Integer shoeSize;
    public Integer wingspan;

    public Long boardNum;
    public Long followingNum;
    public Long followerNum;

    //(현재 레벨에서 몇 % 인지),
    int exp;
    //(다음 랭크까지 몇점 남았는지),
    long expleft;
    //(다음 랭크를 위한 푼 문제 수 0~3)
    int upto;
}
