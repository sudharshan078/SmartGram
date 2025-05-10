package com.register.register.dao;

import com.register.register.models.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Integer> {
    Optional<Friend> findByUsername(String username);
}
