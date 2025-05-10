package com.register.register.dto;

public class ImageDTO {

    private String name;
    private String description;
    private String image; // Base64 encoded image

    // Constructor
    public ImageDTO(String name, String description, String image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
