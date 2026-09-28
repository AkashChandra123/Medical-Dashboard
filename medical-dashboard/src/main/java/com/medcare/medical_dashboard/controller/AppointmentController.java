package com.medcare.medical_dashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medcare.medical_dashboard.model.Appointment;
import com.medcare.medical_dashboard.repository.AppointmentRepository;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    @PostMapping
    public Appointment addAppointment(@RequestBody @Nullable Appointment appointment) {
        if (appointment == null) {
            throw new IllegalArgumentException("Appointment body is required");
        }
        return appointmentRepo.save(appointment);
    }

    @SuppressWarnings("null")
    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable String id) {
        return appointmentRepo.findById(id).orElse(null);
    }

    @SuppressWarnings("null")
    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable String id) {
        appointmentRepo.deleteById(id);
    }
}