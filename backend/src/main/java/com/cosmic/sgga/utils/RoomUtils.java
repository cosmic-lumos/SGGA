package com.cosmic.sgga.utils;

import java.util.Objects;

import java.util.Base64;

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
    public static String createRandomCode(int pk){
        return Base64.getEncoder().encodeToString(Integer.toString(Objects.hash(pk)).getBytes());
    }
}
