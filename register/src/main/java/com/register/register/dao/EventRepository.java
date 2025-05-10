package com.register.register.dao;

import com.register.register.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // New method to find events by username
    List<Event> findByUsername(String username);
}
