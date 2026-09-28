package com.medcare.medical_dashboard.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "appointments")
public class Appointment {

    @Id
    private String id;

    private String patientId;      // link to patient
    private String patientName;    // display name
    private String doctorId;       // link to doctor
    private String hospitalId;     // link to hospital
    private String brokerId;       // optional broker reference
    private String status;         // Pending, Confirmed, Rejected

    private LocalDateTime appointmentDate; // ✅ required for repository queries
    private LocalDateTime createdAt;       // ✅ required for recent queries

    // 🔹 Default constructor
    public Appointment() {}

    // 🔹 Parameterized constructor
    public Appointment(String patientId, String patientName, String doctorId,
                       String hospitalId, String brokerId,
                       String status, LocalDateTime appointmentDate,
                       LocalDateTime createdAt) {
        this.patientId = patientId;
        this.patientName = patientName;
        this.doctorId = doctorId;
        this.hospitalId = hospitalId;
        this.brokerId = brokerId;
        this.status = status;
        this.appointmentDate = appointmentDate;
        this.createdAt = createdAt;
    }

    // 🔹 Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }

    public String getHospitalId() { return hospitalId; }
    public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

    public String getBrokerId() { return brokerId; }
    public void setBrokerId(String brokerId) { this.brokerId = brokerId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDateTime appointmentDate) { this.appointmentDate = appointmentDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // 🔹 toString() method for debugging/logging
    @Override
    public String toString() {
        return "Appointment{" +
                "id='" + id + '\'' +
                ", patientId='" + patientId + '\'' +
                ", patientName='" + patientName + '\'' +
                ", doctorId='" + doctorId + '\'' +
                ", hospitalId='" + hospitalId + '\'' +
                ", brokerId='" + brokerId + '\'' +
                ", status='" + status + '\'' +
                ", appointmentDate=" + appointmentDate +
                ", createdAt=" + createdAt +
                '}';
    }
}