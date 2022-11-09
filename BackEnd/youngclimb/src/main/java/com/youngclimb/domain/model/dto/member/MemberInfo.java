package com.youngclimb.domain.model.dto.member;

import com.youngclimb.domain.model.dto.board.BoardDto;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class MemberInfo {
    public String email;
    public String nickname;
    public String intro;
    public String image;
    public Integer height;
    public Integer shoeSize;
    public Integer wingspan;
}
