package com.register.register.controller;

import com.register.register.dto.EventDTO;
import com.register.register.models.Event;
import com.register.register.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:5174")  // Allow frontend access
public class EventController {

    @Autowired
    private EventService eventService;

    // Welcome endpoint
    @GetMapping("/")
    public String welcome() {
        return "Welcome to Event Service!";
    }

    // Save Event details
    @PostMapping("/save")
    public String saveEvent(@RequestBody EventDTO eventDTO) {
        // Pass the EventDTO directly to the service
        return eventService.saveEvent(eventDTO);
    }

    // Fetch all events
    @GetMapping("/fetch")
    public List<Event> fetchEvents() {
        return eventService.fetchEvents();
    }

    // Fetch events registered by a specific user
    @GetMapping("/fetch/{username}")

    public List<Event> fetchEventsByUsername(@PathVariable String username) {
        return eventService.fetchEventsByUsername(username);
    }
}
