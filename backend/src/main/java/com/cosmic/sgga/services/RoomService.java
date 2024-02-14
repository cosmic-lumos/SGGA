package com.cosmic.sgga.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmic.sgga.dtos.RoomDto;
import com.cosmic.sgga.dtos.RoomMakeDto;
import com.cosmic.sgga.dtos.UserDto;
import com.cosmic.sgga.entities.Room;
import com.cosmic.sgga.entities.User;
import com.cosmic.sgga.repositories.RoomRepository;
import com.cosmic.sgga.repositories.UserRepository;
import com.cosmic.sgga.utils.RoomUtils;

/**
 * 룸과 관련된 비즈니스 로직을 수행하는 서비스
 * 
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
@Service
public class RoomService {
    /**
     * JPA User
     */
    @Autowired 
    private UserRepository userRepository;
    
    /**
     * JPA Room
     */
    @Autowired
    private RoomRepository roomRepository;

    /**
     * roomInfo를 이용해 Room을 생성해 반환
     * DB 저장됨
     * 
     * @param roomInfo
     * @return Room
     */
    public Room createRoom(RoomMakeDto roomInfo) {
        User host = new User();
        host.setName(roomInfo.getHost().getName());
        userRepository.save(host);

        Room room = new Room();
        room.setHost(host);
        room.setTable4(roomInfo.getTable4());
        room.setTable6(roomInfo.getTable6());
        roomRepository.save(room);
        room.setRandomCode(RoomUtils.createRandomCode(room.getId()));
        roomRepository.save(room);

        return room;
    }

    /**
     * roomCode를 이용해 room을 찾은 후 반환
     * @param roomCode
     * @return
     * @throws Exception 만약 없을 경우 오류 발생
     */
    public Room findRoom(String roomCode) throws Exception{
        if(roomRepository.findById(RoomUtils.decodeRandomCode(roomCode)).isEmpty()){
            throw new Exception("No code");
        }
        return roomRepository.findById(RoomUtils.decodeRandomCode(roomCode)).get();
    }

    /**
     * room에 새로운 유저를 추가하고 반환
     * @param room
     * @param user
     * @return RoomDto
     */
    public RoomDto joinRoom(Room room, UserDto user){
        User newUser = new User();
        newUser.setName(user.getName());
        userRepository.save(newUser);
        room.addUsers(newUser);
        roomRepository.save(room);
        return RoomDto.toDTO(room);
    }

    public RoomDto changeSeat(Room room, UserDto user) throws Exception {
        if(!room.getHost().getName().equals(user.getName())){
            throw new Exception("방장이 아닙니다.");
        }
        RoomDto roomDto = RoomDto.toDTO(room);
        roomDto.setTables(RoomUtils.randomSeatting(room));
        return roomDto;
    }
}
