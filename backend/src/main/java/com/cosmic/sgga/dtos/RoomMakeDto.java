package com.cosmic.sgga.dtos;

/**
 * Room 생성을 위해 사용자에게 입력받는 DTO
 * 
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
public class RoomMakeDto {
    /**
     * 방을 만드는 호스트 정보
     */
    private UserDto host;
    
    /**
     * 4인용 테이블의 개수
     */
    private Integer table4;

    /**
     * 6인용 테이블의 개수
     */
    private Integer table6;

    public UserDto getHost() {
        return host;
    }
    public void setHost(UserDto host) {
        this.host = host;
    }
    public Integer getTable4() {
        return table4;
    }
    public void setTable4(Integer table4) {
        this.table4 = table4;
    }
    public Integer getTable6() {
        return table6;
    }
    public void setTable6(Integer table6) {
        this.table6 = table6;
    }

}
