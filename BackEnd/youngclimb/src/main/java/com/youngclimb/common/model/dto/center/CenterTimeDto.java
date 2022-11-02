package com.youngclimb.common.model.dto.center;

import lombok.Data;

import java.time.LocalTime;

@Data
public class CenterTimeDto {
    Integer id;
    Integer day;
    LocalTime timeStart;
    LocalTime timeEnd;
}
