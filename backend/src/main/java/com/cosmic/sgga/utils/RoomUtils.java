package com.cosmic.sgga.utils;

import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.List;

import com.cosmic.sgga.dtos.UserDto;

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

    public static List<List<UserDto>> randomSeatting() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'randomSeatting'");
    }
}
