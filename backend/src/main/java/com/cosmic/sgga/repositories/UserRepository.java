package com.cosmic.sgga.repositories;

import org.springframework.data.repository.CrudRepository;

import com.cosmic.sgga.entities.User;

public interface UserRepository extends CrudRepository<User, Integer> {
    
}
