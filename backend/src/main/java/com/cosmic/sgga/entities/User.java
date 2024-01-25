package com.cosmic.sgga.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * 유저를 표현하는 엔티티
 * @author rkwoal216@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
@Entity
@Table(name="user")
public class User {
    /**
     * PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    /**
     * 유저 이름
     */
    private String name;

    /**
     * 자신이 개설한 방의 참조
     */
    @OneToOne(mappedBy = "host")
    private Room room;

    /**
     * 자식이 속한 방의 참조
     */
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room myroom;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Room getMyroom() {
        return myroom;
    }

    public void setMyroom(Room myroom) {
        this.myroom = myroom;
    }

    
}
