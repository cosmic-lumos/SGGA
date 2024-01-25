package com.cosmic.sgga.utils;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.*;

@SpringBootTest
public class RoomUtilsTest {

    @DisplayName("랜덤코드 생성길이 테스트")
    @Test
    public void 랜덤코드_생성길이_테스트(){
        int length = 5;
        assert RoomUtils.createRandomCode(length).length() == 5;
    }


    @DisplayName("랜덤코드 생성문자열 중복 테스트")
    @Test
    public void 랜덤코드_중복_테스트(){
        Set<String> randomCodes = new HashSet<>();
        int duplicate = 0;

        for(int i=0;i<1000000;i++){
            String code = RoomUtils.createRandomCode(5);
            if(randomCodes.contains(code)){
                duplicate++;
                continue;
            }
            randomCodes.add(code);
        }
        
        assert duplicate < 10;
    }
}
