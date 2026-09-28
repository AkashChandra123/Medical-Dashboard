package com.medcare.medical_dashboard.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "hospitals")
public class Hospital {

    @Id
    private String id;
    private String name;
    private String address;
    private String email;
    private String password;

    // ✅ Add doctorIds field to support doctor queries
    private List<String> doctorIds;

    // ✅ Add departments field to support department queries
    private List<String> departments;

    // 🔹 Default constructor
    public Hospital() {}

    // 🔹 Parameterized constructor
    public Hospital(String name, String address, String email, String password,
                    List<String> doctorIds, List<String> departments) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.password = password;
        this.doctorIds = doctorIds;
        this.departments = departments;
    }

    // 🔹 Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public List<String> getDoctorIds() { return doctorIds; }
    public void setDoctorIds(List<String> doctorIds) { this.doctorIds = doctorIds; }

    public List<String> getDepartments() { return departments; }
    public void setDepartments(List<String> departments) { this.departments = departments; }

    // 🔹 toString() method for debugging/logging
    @Override
    public String toString() {
        return "Hospital{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", doctorIds=" + doctorIds +
                ", departments=" + departments +
                '}';
    }
}