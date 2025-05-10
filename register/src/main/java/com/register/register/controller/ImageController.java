package com.register.register.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.register.register.dto.ImageDTO;
import com.register.register.service.ImageService;

@RestController
@RequestMapping("/imageOrFile")
@CrossOrigin(origins = "http://localhost:5174")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/save")
    public String saveImageOrFile(@RequestParam("file") MultipartFile file,
                                  @RequestParam("name") String name,
                                  @RequestParam("description") String description,
                                  @RequestParam("username") String username) throws IOException {
        return imageService.saveImage(file, name, description, username);
    }

    @GetMapping("/")
    public String sayHello() {
        return "Welcome!";
    }

    @GetMapping("/fetch")
    public List<ImageDTO> fetchImages() {
        return imageService.fetchImages();
    }
}
