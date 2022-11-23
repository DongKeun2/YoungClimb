package com.youngclimb.domain.model.dto.report;

import lombok.Data;

@Data
public class AdminCenterDto {
    Integer id;
    String name;
    Float latitude;
    Float longitude;
    String address;
    Long boardNum;

}
