package com.register.register.dto;

public class EventDTO {
    
    private String username;
    private String fullName;
    private String place;
    private String email;
    private String mobileNumber;
    private String whatsappNumber;

    // Default constructor
    public EventDTO() {}

    // Constructor with all fields
    public EventDTO(String username, String fullName, String place, String email, String mobileNumber, String whatsappNumber) {
        this.username = username;
        this.fullName = fullName;
        this.place = place;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.whatsappNumber = whatsappNumber;
    }

    // Getters and Setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getWhatsappNumber() {
        return whatsappNumber;
    }

    public void setWhatsappNumber(String whatsappNumber) {
        this.whatsappNumber = whatsappNumber;
    }

    @Override
    public String toString() {
        return "EventDTO{" +
                "username='" + username + '\'' +
                ", fullName='" + fullName + '\'' +
                ", place='" + place + '\'' +
                ", email='" + email + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", whatsappNumber='" + whatsappNumber + '\'' +
                '}';
    }
}
