package com.youngclimb.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_center")
public class Center {
    //클라이밍장 번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "center_id")
    private Integer id;
    // 클라이밍장 이름
    @Column(name = "center+name")
    private  String name;
    // 클라이밍장 위치(위도)
    @Column(name = "center_lat")
    private Float latitude;
    // 클라이밍장 위치(경도)
    @Column(name = "center_long")
    private Float longitude;
    // 클라이밍장 주소
    @Column(name = "center_address")
    private String address;
    // 클라이밍장 전화번호
    @Column(name = "center_phone_number")
    private String phoneNumber;
}
