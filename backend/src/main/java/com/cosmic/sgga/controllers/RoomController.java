package com.cosmic.sgga.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cosmic.sgga.dtos.RoomDto;
import com.cosmic.sgga.dtos.RoomMakeDto;
import com.cosmic.sgga.dtos.UserDto;
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
@Controller
public class RoomController {
    @Autowired
    private RoomService roomService;

    @PostMapping("/api/rooms")
    public @ResponseBody RoomDto createRoom(@RequestBody RoomMakeDto roomInfo) {
        Room newRoom = roomService.createRoom(roomInfo);
        
        return RoomDto.toDTO(newRoom);
    }
    
    @Transactional
    @MessageMapping("/{roomCode}/join")
    @SendTo("/room/{roomCode}")
    public RoomDto joinUser(@RequestBody UserDto user, @DestinationVariable("roomCode") String roomCode, StompHeaderAccessor stompHeaderAccessor) throws Exception {
        return roomService.joinRoom(roomService.findRoom(roomCode), user);
    }
}
