package com.medcare.medical_dashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.medcare.medical_dashboard.model.Appointment;
import com.medcare.medical_dashboard.repository.AppointmentRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepo;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    public Appointment addAppointment(@NonNull Appointment appointment) {
        return appointmentRepo.save(appointment);
    }

    public Appointment getAppointmentById(@NonNull String id) {
        return appointmentRepo.findById(id).orElse(null);
    }

    public void deleteAppointment(@NonNull String id) {
        appointmentRepo.deleteById(id);
    }
}