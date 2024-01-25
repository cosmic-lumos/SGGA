package com.cosmic.sgga.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cosmic.sgga.dtos.RoomMakeDto;
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
        roomRepository.save(room);
        room.setRandomCode(RoomUtils.createRandomCode(room.getId()));
        room.addUsers(host);
        roomRepository.save(room);

        return room;
    }
}
