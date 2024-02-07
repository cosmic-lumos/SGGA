package com.cosmic.sgga.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.cosmic.sgga.controllers.RoomController;
import com.cosmic.sgga.dtos.RoomDto;
import com.cosmic.sgga.entities.Room;
import com.cosmic.sgga.entities.User;
import com.cosmic.sgga.repositories.RoomRepository;

import jakarta.transaction.Transactional;

import java.util.*;

@SpringBootTest
public class RoomUtilsTest {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomController roomController;

    @DisplayName("코드 인코딩 디코딩 확인")
    @Test
    public void 랜덤코드_생성_테스트(){
        String code = RoomUtils.createRandomCode(5);
        assert RoomUtils.decodeRandomCode(code) == 5;
    }


    @DisplayName("랜덤코드 생성문자열 중복 테스트")
    @Test
    public void 랜덤코드_중복_테스트(){
        Set<String> randomCodes = new HashSet<>();
        int duplicate = 0;

        for(int i=0;i<1000000;i++){
            String code = RoomUtils.createRandomCode(i);
            if(randomCodes.contains(code)){
                duplicate++;
                continue;
            }
            randomCodes.add(code);
        }
        
        assert duplicate < 10;
    }

    @DisplayName("룸 생성시 pk 생성 확인")
    @Test
    public void PK생성확인(){
        Room room = new Room();
        roomRepository.save(room);
        
        assert room.getId() != null;
    }

    @Transactional
    @DisplayName("랜덤 테이블 배정 확인")
    @Test
    public void 랜덤테이블_배정_확인(){
        Room room = new Room();
        User host = new User();
        host.setName("host");
        room.setHost(host);
        room.setTable4(1);
        room.setTable6(1);
        for(int i=0;i<10;i++){
            User user = new User();
            user.setName("person"+i);
            room.addUsers(user);
        }
        roomRepository.save(room);
        RoomDto dto = RoomDto.toDTO(room);
        dto.setTables(RoomUtils.randomSeatting(room));

        assert dto.getTables().size() == 3;
    }
}
