package com.youngclimb.domain.model.dto.center;

import java.util.List;

public class CenterDetailDto {
    Long id;
    String name;
    Float latitude;
    Float longitude;
    String address;
    String phoneNumber;
    List<CenterTimeDto> centerTimeList;
    List<CenterEventDto> centerEventList;
    List<CenterPriceDto> centerPriceList;
    List<CenterLevelDto> centerLevelList;
}
