package com.youngclimb.domain.model.dto.member;

import lombok.Data;

@Data
public class FollowMemberDto {

    String nickname;
    String gender;
    String image;
    Integer height;
    Integer shoeSize;
    Integer wingspan;
    String rank;
    Boolean follow;
}
