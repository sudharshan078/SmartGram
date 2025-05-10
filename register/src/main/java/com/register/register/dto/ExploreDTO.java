package com.register.register.dto;

import java.time.LocalDate;

public class ExploreDTO {

    private Long id;
    private String description;
    private String image; // Base64 encoded image

    private String startTime;
    private LocalDate startDate;
    private int startYear;

    private String registrationLastTime;
    private LocalDate registrationLastDate;
    private int registrationLastYear;

    private String username;

    // Constructor
    public ExploreDTO(Long id, String description, String image,
                      String startTime, LocalDate startDate, int startYear,
                      String registrationLastTime, LocalDate registrationLastDate, int registrationLastYear,
                      String username) {
        this.id = id;
        this.description = description;
        this.image = image;
        this.startTime = startTime;
        this.startDate = startDate;
        this.startYear = startYear;
        this.registrationLastTime = registrationLastTime;
        this.registrationLastDate = registrationLastDate;
        this.registrationLastYear = registrationLastYear;
        this.username = username;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public int getStartYear() {
        return startYear;
    }

    public void setStartYear(int startYear) {
        this.startYear = startYear;
    }

    public String getRegistrationLastTime() {
        return registrationLastTime;
    }

    public void setRegistrationLastTime(String registrationLastTime) {
        this.registrationLastTime = registrationLastTime;
    }

    public LocalDate getRegistrationLastDate() {
        return registrationLastDate;
    }

    public void setRegistrationLastDate(LocalDate registrationLastDate) {
        this.registrationLastDate = registrationLastDate;
    }

    public int getRegistrationLastYear() {
        return registrationLastYear;
    }

    public void setRegistrationLastYear(int registrationLastYear) {
        this.registrationLastYear = registrationLastYear;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
