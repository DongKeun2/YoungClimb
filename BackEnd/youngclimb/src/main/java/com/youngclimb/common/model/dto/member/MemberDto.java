package com.youngclimb.common.model.dto.member;

import lombok.Data;

@Data
public class MemberDto {
    public String email;
    public String password;
    public String nickname;
    public String intro;
    public String image;
    public Integer height;
    public Integer shoeSize;
    public Integer wingspan;

}
