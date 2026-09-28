package com.medcare.medical_dashboard.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.medcare.medical_dashboard.model.Appointment;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, String> {

    // Basic queries
    List<Appointment> findByPatientId(String patientId);
    List<Appointment> findByDoctorId(String doctorId);
    List<Appointment> findByBrokerId(String brokerId);
    List<Appointment> findByHospitalId(String hospitalId);

    // Status-based queries
    List<Appointment> findByStatus(String status);
    List<Appointment> findByPatientIdAndStatus(String patientId, String status);
    List<Appointment> findByDoctorIdAndStatus(String doctorId, String status);

    // Date-based queries
    List<Appointment> findByPatientIdAndAppointmentDateAfterOrderByAppointmentDateAsc(
        String patientId, LocalDateTime date);

    List<Appointment> findByAppointmentDateBetween(
        LocalDateTime startDate, LocalDateTime endDate);

    List<Appointment> findByDoctorIdAndAppointmentDateBetween(
        String doctorId, LocalDateTime startDate, LocalDateTime endDate);

    // Recent appointments
    List<Appointment> findTop10ByOrderByCreatedAtDesc();

    // Count queries
    long countByStatus(String status);
    long countByPatientId(String patientId);
}