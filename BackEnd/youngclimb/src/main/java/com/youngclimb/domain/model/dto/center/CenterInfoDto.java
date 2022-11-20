package com.youngclimb.domain.model.dto.center;

import lombok.Data;

import java.util.List;

@Data
public class CenterInfoDto {
    Integer id;
    String name;
    List<WallDto> wallList;
    List<CenterLevelDto> centerLevelList;
}
