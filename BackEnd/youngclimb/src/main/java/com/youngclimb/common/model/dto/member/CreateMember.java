package com.youngclimb.common.model.dto.member;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateMember {
    String nickname;
    String image;
    String rank;
    Boolean isFollow;
}
