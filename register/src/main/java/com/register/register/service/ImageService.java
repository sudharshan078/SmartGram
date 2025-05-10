package com.register.register.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.register.register.dao.ImageRepository;
import com.register.register.dto.ImageDTO;
import com.register.register.models.Image;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    // Modified method to accept username
    public String saveImage(MultipartFile file, String name, String description, String username) throws IOException {
        Image image = new Image();
        image.setName(name);
        image.setDescription(description);
        image.setUsername(username); // Set username
        image.setImage(file.getBytes());
        imageRepository.save(image);
        return "Image saved in DB with username: " + username;
    }

    public List<ImageDTO> fetchImages() {
        List<Image> images = imageRepository.findAll();
        return images.stream()
                .map(img -> new ImageDTO(
                        img.getName(),
                        img.getDescription(),
                        "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(img.getImage())
                ))
                .collect(Collectors.toList());
    }
}
