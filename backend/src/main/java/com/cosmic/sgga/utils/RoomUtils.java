package com.cosmic.sgga.utils;

import java.nio.ByteBuffer;
import java.util.*;

import com.cosmic.sgga.dtos.UserDto;
import com.cosmic.sgga.entities.Room;
import com.cosmic.sgga.entities.User;

/**
 * 방을 생성할 때 필요한 유틸들 모음
 * @author rkwoal216@gamil.com
 * @version 1.0.0
 * @since 1.0.0
 */
public class RoomUtils {
    /**
     * 룸의 pk의 hashCode를 base64 인코딩하여 반환
     * @param pk
     * @return Base64 인코딩 된 pk
     */
    private static final int SALT = 1000000;
    public static String createRandomCode(int pk){
        byte[] bytes = ByteBuffer.allocate(4).putInt(pk+SALT).array();
        return Base64.getEncoder().withoutPadding().encodeToString(bytes);
    }

    public static int decodeRandomCode(String code){
        byte[] decodedBytes = Base64.getDecoder().decode(code);
        return ByteBuffer.wrap(decodedBytes).getInt() - SALT;
    }

    private static List<UserDto> makeTable(List<User> users, int cur, int size){
        List<UserDto> table = new ArrayList<>();
        for(int i=1;i<=size;i++){
            table.add(UserDto.toDto(users.get(cur-i)));
        }
        return table;
    }

    public static List<List<UserDto>> randomSeatting(Room room) {
        List<List<UserDto>> tables = new ArrayList<>();
        int userSize = room.getUsers().size();
        
        Collections.shuffle(room.getUsers());

        while(userSize / 6 > 0){
            tables.add(makeTable(room.getUsers(), userSize, 6));
            userSize -= 6;
            continue;
        }
        while(userSize / 4 > 0){
            tables.add(makeTable(room.getUsers(), userSize, 4));
            userSize -= 4;
            continue;
        }
        tables.add(makeTable(room.getUsers(), userSize, userSize));
        return tables;
    }
}
