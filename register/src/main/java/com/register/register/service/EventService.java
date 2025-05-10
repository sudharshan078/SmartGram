package com.register.register.service;

import com.register.register.dao.EventRepository;
import com.register.register.dto.EventDTO;
import com.register.register.models.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public String saveEvent(EventDTO eventDTO) {
        // Fetch the username from the EventDTO
        String username = eventDTO.getUsername();

        // Check if the username exists
        if (username == null || username.isEmpty()) {
            return "Username is required.";
        }

        Event event = new Event();
        event.setUsername(username);
        event.setFullName(eventDTO.getFullName());
        event.setPlace(eventDTO.getPlace());
        event.setEmail(eventDTO.getEmail());
        event.setMobileNumber(eventDTO.getMobileNumber());
        event.setWhatsappNumber(eventDTO.getWhatsappNumber());

        // Save the event in the database
        eventRepository.save(event);

        return "Event data saved successfully";
    }

    public List<Event> fetchEvents() {
        return eventRepository.findAll();
    }

    // New method to fetch events by username
    public List<Event> fetchEventsByUsername(String username) {
        return eventRepository.findByUsername(username);
    }
}
