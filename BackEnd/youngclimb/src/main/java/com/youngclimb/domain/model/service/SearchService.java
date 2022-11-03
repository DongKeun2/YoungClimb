package com.youngclimb.domain.model.service;

import com.youngclimb.domain.model.dto.member.JoinMember;
import com.youngclimb.domain.model.dto.member.MemberPic;

import java.util.List;

public interface SearchService {
    List<MemberPic> getMemberRec();
    List<MemberPic> getMemberPic(String nickname);
}
