package com.youngclimb.domain.model.dto.member;

import lombok.Data;

@Data
public class JoinMember {

    public String email;
    public String nickname;
    public String password;
    public String gender;
    public Integer height;
    public Integer shoeSize;
    public Integer wingspan;

}
