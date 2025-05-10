package com.register.register.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import java.time.LocalDate;

@Entity
public class Explore {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String description;

    @Lob
    private byte[] image;

    // Start Date/Time/Year
    private String startTime;
    private LocalDate startDate;
    private int startYear;

    // Registration Last Date/Time/Year
    private String registrationLastTime;
    private LocalDate registrationLastDate;
    private int registrationLastYear;

    // New field for username
    private String username;

    // Getters and Setters

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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
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
