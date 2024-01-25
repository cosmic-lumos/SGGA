package com.cosmic.sgga.controllers;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cosmic.sgga.dtos.RoomMakeDto;
import com.cosmic.sgga.dtos.UserDto;

/**
 * RoomController를 위한 테스트 클래스
 * 
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
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
}
