package com.youngclimb.common.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.youngclimb.common.model.dto.center.*;
import com.youngclimb.common.model.entity.*;
import com.youngclimb.common.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class CenterServicempl implements CenterService{

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final CenterRepository centerRepository;
    private final Center3DRepository center3DRepository;
    private final CenterEventRepository centerEventRepository;
    private final CenterLevelRepository centerLevelRepository;
    private final CenterTimeRepository centerTimeRepository;
    private final CenterPriceRepository centerPriceRepository;
    private final WallRepository wallRepository;

    private final AmazonS3 amazonS3;

    // 지점 상세 정보
    public CenterDetailDto readCenterDetail(Integer centerId) {
        CenterDetailDto centerDetailDto = new CenterDetailDto();
        List<CenterTimeDto> centerTimeDtos = new ArrayList<>();
        List<CenterLevelDto> centerLevelDtos = new ArrayList<>();
        List<CenterPriceDto> centerPriceDtos = new ArrayList<>();
        List<CenterEventDto> centerEventDtos = new ArrayList<>();
        List<WallDto> wallDtos = new ArrayList<>();

        Center center = centerRepository.findById(centerId).orElseThrow();
        List<CenterTime> centerTimes = centerTimeRepository.findAll(Sort.by(Sort.Direction.ASC, "day"));
        List<CenterLevel> centerLevels = centerLevelRepository.findAll(Sort.by(Sort.Direction.ASC, "level"));
        List<CenterPrice> centerPrices = centerPriceRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        List<CenterEvent> centerEvents = centerEventRepository.findAll(Sort.by(Sort.Direction.ASC, "date"));
        List<Wall> walls = wallRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));

        centerDetailDto.setId(center.getId());
        centerDetailDto.setName(center.getName());
        centerDetailDto.setAddress(center.getAddress());
        centerDetailDto.setLatitude(center.getLatitude());
        centerDetailDto.setLongitude(center.getLongitude());
        centerDetailDto.setPhoneNumber(center.getPhoneNumber());

        for (Wall wall : walls) {
            WallDto wallDto = new WallDto();

            wallDto.setName(wall.getName());
            wallDto.setId(wall.getId());

            wallDtos.add(wallDto);
        }

        for (CenterTime centerTime : centerTimes) {
            CenterTimeDto centerTimeDto = new CenterTimeDto();

            centerTimeDto.setId(centerTime.getId());
            centerTimeDto.setDay(centerTime.getDay());
            centerTimeDto.setTimeStart(centerTime.getTimeStart());
            centerTimeDto.setTimeEnd(centerTime.getTimeEnd());

            centerTimeDtos.add(centerTimeDto);
        }

        for (CenterLevel centerLevel : centerLevels) {
            CenterLevelDto centerLevelDto = new CenterLevelDto();

            centerLevelDto.setId(centerLevel.getId());
            centerLevelDto.setLevelRank(centerLevel.getLevel().getRank());
            centerLevelDto.setColor(centerLevel.getColor());

            centerLevelDtos.add(centerLevelDto);
        }

        for (CenterPrice centerPrice : centerPrices) {
            CenterPriceDto centerPriceDto = new CenterPriceDto();

            centerPriceDto.setId(centerPrice.getId());
            centerPriceDto.setName(centerPrice.getName());
            centerPriceDto.setPrice(centerPrice.getPrice());

            centerPriceDtos.add(centerPriceDto);
        }

        for (CenterEvent centerEvent : centerEvents) {
            CenterEventDto centerEventDto = new CenterEventDto();

            centerEventDto.setId(centerEvent.getId());
            centerEventDto.setDate(centerEvent.getDate());
            centerEventDto.setContent(centerEvent.getContent());

            centerEventDtos.add(centerEventDto);
        }

        centerDetailDto.setWallList(wallDtos);
        centerDetailDto.setCenterTimeList(centerTimeDtos);
        centerDetailDto.setCenterLevelList(centerLevelDtos);
        centerDetailDto.setCenterPriceList(centerPriceDtos);
        centerDetailDto.setCenterEventList(centerEventDtos);


        return centerDetailDto;
    }

    // 전 지점 거리순으로 리스트 보내기
    public List<CenterDto> distanceCenters(Float lat, Float lon) {
        List<CenterDto> centerDtos = new ArrayList<>();

        List<Center> centers = centerRepository.findAll();

        for (Center center : centers) {
            CenterDto centerDto = new CenterDto();

            centerDto.setId(center.getId());
            centerDto.setName(center.getName());
            centerDto.setLongitude(center.getLongitude());
            centerDto.setLatitude(center.getLongitude());
            centerDto.setAddress(center.getAddress());
            centerDto.setPhoneNumber(center.getPhoneNumber());

            centerDto.setDistance(distanceInKilometerByHaversine(lat, lon, center.getLatitude(), center.getLongitude()));

            centerDtos.add(centerDto);
        }

        centerDtos.sort(new Comparator<CenterDto>() {
            @Override
            public int compare(CenterDto o1, CenterDto o2) {
                return o1.getDistance() - o2.getDistance();
            }
        });

        return centerDtos;
    }

    // 거리계산기
    public int distanceInKilometerByHaversine(Float lat, Float lon, Float lat2, Float lon2) {
        double distance;
        double radius = 6371; // 지구 반지름(km)
        double toRadian = Math.PI / 180;

        double deltaLatitude = Math.abs(lat - lat2) * toRadian;
        double deltaLongitude = Math.abs(lon - lon2) * toRadian;

        double sinDeltaLat = Math.sin(deltaLatitude / 2);
        double sinDeltaLng = Math.sin(deltaLongitude / 2);
        double squareRoot = Math.sqrt(
                sinDeltaLat * sinDeltaLat +
                        Math.cos(lat * toRadian) * Math.cos(lat2 * toRadian) * sinDeltaLng * sinDeltaLng);

        distance = 2000 * radius * Math.asin(squareRoot);


        return (int) Math.round(distance);
    }

}
