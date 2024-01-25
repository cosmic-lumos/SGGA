package com.cosmic.sgga.dtos;

import java.util.ArrayList;
import java.util.List;

import com.cosmic.sgga.entities.Room;

/**
 * Room 데이터 전달을 위한 DTO
 * 
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
public class RoomDto {
    /**
     * PK
     */
    private Integer id;
    /**
     * Host 유저 정보
     */
    private UserDto host;
    /**
     * 방 접속 랜덤 코드
     */
    private String randomCode;
    /**
     * 방에 속한 유저들 정보
     */
    private List<UserDto> users;
    /**
     * 각 테이블별 채워진 유저들 정보
     * <small>4인용 -> 6인용 순서로 채워짐</small>
     */
    private List<List<UserDto>> tables = new ArrayList<>(); 

    public Integer getId() {
        return id;
    }
    public String getRandomCode() {
        return randomCode;
    }    
    public UserDto getHost() {
        return host;
    }

    /**
     * Room을 바탕으로 RoomDTO 생성
     * @param entity: RoomDTO로 만들 Room
     * @return
     */
    public static RoomDto toDTO(Room entity){
        RoomDto dto = new RoomDto();
        dto.setId(entity.getId());
        dto.setHost(UserDto.toDto(entity.getHost()));
        dto.setRandomCode(entity.getRandomCode());
        dto.setUsers(entity.getUsers().stream().map(UserDto::toDto).toList());
        return dto;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setHost(UserDto host) {
        this.host = host;
    }

    public void setRandomCode(String randomCode) {
        this.randomCode = randomCode;
    }

    public List<UserDto> getUsers() {
        return users;
    }

    public void setUsers(List<UserDto> users) {
        this.users = users;
    }
    public List<List<UserDto>> getTables() {
        return tables;
    }
    public void setTables(List<List<UserDto>> tables) {
        this.tables = tables;
    }

    
}
