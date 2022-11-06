package com.youngclimb.domain.model.dto.center;

import lombok.Data;

import java.util.List;

@Data
public class CenterDetailDto {
    Integer id;
    String name;
    Float latitude;
    Float longitude;
    String address;
    String phoneNumber;
    List<CenterTimeDto> centerTimeList;
    List<CenterEventDto> centerEventList;
    List<CenterPriceDto> centerPriceList;
    List<CenterLevelDto> centerLevelList;
    List<WallDto> wallList;
    Boolean wall;
}
