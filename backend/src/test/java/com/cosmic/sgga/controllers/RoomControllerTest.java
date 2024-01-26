package com.cosmic.sgga.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cosmic.sgga.dtos.RoomDto;
import com.cosmic.sgga.dtos.RoomMakeDto;
import com.cosmic.sgga.dtos.UserDto;

import jakarta.transaction.Transactional;

/**
 * RoomController를 위한 테스트 클래스
 * 
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
@Transactional
@SpringBootTest
public class RoomControllerTest {
    @Autowired
    private RoomController roomController;

    @DisplayName("룸 컨트롤러 테스트")
    @Test
    void 컨트롤러_테스트(){
        assert roomController != null;
    }

    @DisplayName("룸 만들기 테스트")
    @Test
    void 룸_먄들기_테스트(){
        RoomMakeDto roomDto = new RoomMakeDto();
        UserDto userDto = new UserDto();
        userDto.setName("william");
        roomDto.setHost(userDto);
        roomDto.setTable4(3);
        roomDto.setTable6(4);

        assert roomController.createRoom(roomDto) != null;
    }

    @DisplayName("룸 입장 시 코드 확인 테스트")
    @Test
    void 룸_찾기_테스트(){
        RoomMakeDto roomMakeDto = new RoomMakeDto();
        UserDto userDto = new UserDto();
        userDto.setName("william");
        roomMakeDto.setHost(userDto);
        roomMakeDto.setTable4(3);
        roomMakeDto.setTable6(4);

        RoomDto roomDto = roomController.createRoom(roomMakeDto);
        
        UserDto joinUserDto = new UserDto();
        joinUserDto.setName("john");
        assert roomController.joinUser(joinUserDto, roomDto.getRandomCode(), null) != null;
    }
}
