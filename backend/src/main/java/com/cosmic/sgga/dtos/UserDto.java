package com.cosmic.sgga.dtos;

import com.cosmic.sgga.entities.User;

/**
 * 유저 데이터 전달을 위한 DTO
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
public class UserDto {
    /**
     * 유저 이름
     */
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    /**
     * User를 UserDTO로 변환
     * @param entity: User 정보
     * @return UserDto
     */
    public static UserDto toDto(User entity){
        UserDto dto = new UserDto();
        dto.setName(entity.getName());
        return dto;
    }
}
