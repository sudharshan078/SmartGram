package com.register.register.controller;

import com.register.register.models.Friend;
import com.register.register.service.FriendService;
import com.register.register.dto.FriendRequest; // Make sure this class exists
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friend")
@CrossOrigin(origins = "http://localhost:5174") // Cross-Origin from your frontend URL
public class FriendController {

    @Autowired
    private FriendService friendService;

    // Method to add a friend
    @PostMapping("/post")
    public ResponseEntity<String> addFriend(@RequestBody FriendRequest request) {
        if (request.getUsername() == null || request.getFriendUsername() == null) {
            return ResponseEntity.badRequest().body("username or friendUsername is missing");
        }

        friendService.addFriend(request.getUsername(), request.getFriendUsername());
        return ResponseEntity.ok("Friend added successfully");
    }

    // Method to get all friends
    @GetMapping("/all")
    public ResponseEntity<List<Friend>> getAllFriendLinks() {
        return ResponseEntity.ok(friendService.getAllFriendLinks());
    }

    // Optional: Add a simple message endpoint
    @GetMapping("/message")
    public String first() {
        return "Hello from FriendController";
    }
}
