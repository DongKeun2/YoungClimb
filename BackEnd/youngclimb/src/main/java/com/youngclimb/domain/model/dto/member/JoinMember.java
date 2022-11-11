package com.youngclimb.domain.model.dto.member;

import lombok.Data;

@Data
public class JoinMember {

    public String email;
    public String nickname;
    public String password;
    public String gender;
    public Integer height = 0;
    public Integer shoeSize = 0;
    public Integer wingspan = 0;
    public String fcmToekn;

}
