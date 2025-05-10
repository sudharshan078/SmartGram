package com.register.register.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.register.register.dao.ProfileRepository;
import com.register.register.dto.ProfileDTO;
import com.register.register.models.Profile;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    // Save Profile
    public String saveProfile(MultipartFile file, String bio, String username) throws IOException {
        // Create a new profile object
        Profile profile = new Profile();

        // Swap username and bio
        profile.setUsername(bio);  // Save bio as username
        profile.setBio(username);   // Save username as bio

        // Handle file upload (for the profile image)
        profile.setProfileImage(file.getBytes()); // Save image as byte array

        // Save the profile to the database
        profileRepository.save(profile);

        return "Profile saved successfully!";
    }

    // Fetch all profiles
    public List<ProfileDTO> fetchProfiles() {
        List<Profile> profiles = profileRepository.findAll();

        // Convert Profile entities to ProfileDTOs
        return profiles.stream()
                .map(profile -> new ProfileDTO(
                        profile.getId(),
                        profile.getUsername(),     // Use the swapped username
                        profile.getBio(),          // Use the swapped bio
                        profile.getProfileImage()  // Return the profile image
                ))
                .collect(Collectors.toList());
    }
}
