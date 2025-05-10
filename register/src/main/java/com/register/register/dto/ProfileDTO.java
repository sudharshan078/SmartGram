package com.register.register.dto;

import java.util.Base64;

public class ProfileDTO {
    private Long id;
    private String username;
    private String bio;
    private String profileImage; // Now a Base64 encoded string

    // Default constructor (required for frameworks like Spring)
    public ProfileDTO() {
    }

    // Constructor that accepts a byte[] for image and converts it to Base64
    public ProfileDTO(Long id, String username, String bio, byte[] profileImageBytes) {
        this.id = id;
        this.username = username;
        this.bio = bio;
        if (profileImageBytes != null) {
            this.profileImage = Base64.getEncoder().encodeToString(profileImageBytes);
        } else {
            this.profileImage = null;
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImage() {
        return profileImage;
    }

    // Optional: allow setting profileImage directly as Base64 string
    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
