package com.register.register.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.register.register.models.Users;

@Repository
public interface UserDao extends JpaRepository<Users, Integer>{

}
