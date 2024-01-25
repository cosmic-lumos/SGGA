package com.cosmic.sgga.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cosmic.sgga.dtos.RoomDto;
import com.cosmic.sgga.dtos.RoomMakeDto;
import com.cosmic.sgga.entities.Room;
import com.cosmic.sgga.services.RoomService;

import jakarta.transaction.Transactional;

/**
 * 방에 대한 api를 처리하는 컨트롤러
 * 
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
@RestController
@RequestMapping(path="/api")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @Transactional
    @PostMapping("/rooms")
    public @ResponseBody RoomDto createRoom(@RequestBody RoomMakeDto roomInfo) {
        Room newRoom = roomService.createRoom(roomInfo);
        
        return RoomDto.toDTO(newRoom);
    }
    

}
