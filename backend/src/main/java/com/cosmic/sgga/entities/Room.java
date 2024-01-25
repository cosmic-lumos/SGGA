package com.cosmic.sgga.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * 방 정보를 표현하는 엔티티
 * 
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
@Entity
@Table(name="room")
public class Room {
    /**
     * PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Integer id;

    /**
     * 방을 개설한 유저와 1:1 관계
     */
    @OneToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User host;
    
    /**
     * 다른 유저가 입장 시 필요한 코드
     */
    @Column(name="code")
    private String randomCode;
    
    /**
     * 방에 속한 유저들
     */
    @OneToMany(mappedBy = "myroom")
    private List<User> users = new ArrayList<>();

    /**
     * 자리가 4개인 테이블의 개수
     */
    @Column(name="table4")
    private Integer table4;

    /**
     * 자리가 6개인 테이블의 개수
     */
    @Column(name="table6")
    private Integer table6;

    /**
     * 유저를 추가할 때 1:N의 양방향 성립
     * @param user
     */
    public void addUsers(User user){
        users.add(user);
        user.setMyroom(this);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRandomCode() {
        return randomCode;
    }

    public void setRandomCode(String randomCode) {
        this.randomCode = randomCode;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
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
