package com.youngclimb.domain.model.dto.center;


import lombok.Data;

import java.time.LocalDate;

@Data
public class CenterEventDto {
    Integer id;
    LocalDate date;
    String content;
}
