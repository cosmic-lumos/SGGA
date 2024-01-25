package com.cosmic.sgga.utils;

import java.util.Objects;

/**
 * 방을 생성할 때 필요한 유틸들 모음
 * @author rkwoal216@gamil.com
 * @version 1.0.0
 * @since 1.0.0
 */
public class RoomUtils {
    private static int seed = 0;

    public static String createRandomCode(int length){
        seed++;
        return Integer.toString(Objects.hash(seed));
    }
}
