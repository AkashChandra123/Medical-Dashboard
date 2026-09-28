package com.medcare.medical_dashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "doctors")
public class Doctor {

    @Id
    private String id;
    private String name;
    private String specialization;
    private String hospitalId;
    private boolean available;
    private String email;
    private String password;

    // 🔹 Default constructor
    public Doctor() {}

    // 🔹 Parameterized constructor
    public Doctor(String name, String specialization, String hospitalId, boolean available, String email, String password) {
        this.name = name;
        this.specialization = specialization;
        this.hospitalId = hospitalId;
        this.available = available;
        this.email = email;
        this.password = password;
    }

    // 🔹 Getters and Setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getHospitalId() {
        return hospitalId;
    }
    public void setHospitalId(String hospitalId) {
        this.hospitalId = hospitalId;
    }

    public boolean isAvailable() {
        return available;
    }
    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    // 🔹 toString() method for debugging/logging
    @Override
    public String toString() {
        return "Doctor{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", specialization='" + specialization + '\'' +
                ", hospitalId='" + hospitalId + '\'' +
                ", available=" + available +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}