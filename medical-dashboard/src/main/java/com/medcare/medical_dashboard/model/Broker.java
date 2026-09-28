package com.medcare.medical_dashboard.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "brokers")
public class Broker {

    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private String whatsappNumber;
    private List<String> specializations;
    private List<String> languages;
    private double commissionRate;
    private double rating;
    private int totalAppointments;

    // 🔹 Default constructor
    public Broker() {}

    // 🔹 Parameterized constructor
    public Broker(String name, String email, String phone, String whatsappNumber,
                  List<String> specializations, List<String> languages,
                  double commissionRate, double rating, int totalAppointments) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.whatsappNumber = whatsappNumber;
        this.specializations = specializations;
        this.languages = languages;
        this.commissionRate = commissionRate;
        this.rating = rating;
        this.totalAppointments = totalAppointments;
    }

    // 🔹 Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }

    public List<String> getSpecializations() { return specializations; }
    public void setSpecializations(List<String> specializations) { this.specializations = specializations; }

    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }

    public double getCommissionRate() { return commissionRate; }
    public void setCommissionRate(double commissionRate) { this.commissionRate = commissionRate; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getTotalAppointments() { return totalAppointments; }
    public void setTotalAppointments(int totalAppointments) { this.totalAppointments = totalAppointments; }

    // 🔹 toString() method for debugging/logging
    @Override
    public String toString() {
        return "Broker{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", whatsappNumber='" + whatsappNumber + '\'' +
                ", specializations=" + specializations +
                ", languages=" + languages +
                ", commissionRate=" + commissionRate +
                ", rating=" + rating +
                ", totalAppointments=" + totalAppointments +
                '}';
    }
}