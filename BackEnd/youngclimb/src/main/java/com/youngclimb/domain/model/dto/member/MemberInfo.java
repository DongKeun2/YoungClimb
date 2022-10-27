package com.youngclimb.domain.model.dto.member;

import lombok.Data;

@Data
public class MemberInfo {
    public String nickname;
    public String intro;
    public String image;
    public Integer height;
    public Integer shoeSize;
    public Integer wingspan;
}
