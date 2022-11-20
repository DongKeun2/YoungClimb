package com.youngclimb.domain.model.dto.member;

import lombok.Data;

import java.util.List;

@Data
public class FollowMemberList {

    List<FollowMemberDto> followings;
    List<FollowMemberDto> followers;
    Integer followingNum;
    Integer followerNum;

}
