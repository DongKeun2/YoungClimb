package com.youngclimb.domain.model.dto.center;


import lombok.Data;

@Data
public class CenterDto {
    Integer id;
    String name;
    Float latitude;
    Float longitude;
    String address;
    String phoneNumber;
    Integer distance;
}
