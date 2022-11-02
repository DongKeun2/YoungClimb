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
}
