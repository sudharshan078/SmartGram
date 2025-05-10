package com.register.register.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import com.register.register.dto.ProfileDTO;
import com.register.register.service.ProfileService;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5174")  // Allow frontend to communicate
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // Save Profile
    @PostMapping("/save")
    public String saveProfile(@RequestParam("username") String username, // Added username parameter
                               @RequestParam("file") MultipartFile file, 
                               @RequestParam("bio") String bio) throws IOException {

        // Handle the profile save logic, including checking for empty file
        if (file.isEmpty()) {
            return "No file uploaded";  // Error message for empty file
        }

        // Swap username and bio
        return profileService.saveProfile(file, bio, username); // Pass swapped parameters to the service
    }

    // Welcome endpoint
    @GetMapping("/")
    public String sayHello() {
        return "Welcome to Profile Service!";
    }

    // Fetch Profiles
    @GetMapping("/fetch")
    public List<ProfileDTO> fetchProfiles() {
        return profileService.fetchProfiles(); // Fetch profiles using the service
    }
}
