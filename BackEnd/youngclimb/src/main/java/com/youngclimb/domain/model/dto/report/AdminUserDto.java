package com.youngclimb.domain.model.dto.report;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AdminUserDto {
    Long id;
    String nickname;
    String rank;
    Long exp;
    LocalDate createdAt;
    LocalDateTime lastLogin;
    Long createBoardNum;
    Long createCommentNum;
    Long createRecommentNum;
    Long followingNum;
    Long followerNum;
    Long scrapNum;
}
