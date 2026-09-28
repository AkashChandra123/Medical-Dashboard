package com.medcare.medical_dashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.medcare.medical_dashboard.model.Doctor;
import com.medcare.medical_dashboard.repository.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepo;

    @Autowired
    public DoctorService(DoctorRepository doctorRepo) {
        this.doctorRepo = doctorRepo;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    public Doctor addDoctor(@NonNull Doctor doctor) {
        return doctorRepo.save(doctor);
    }

    public Doctor getDoctorById(@NonNull String id) {
        return doctorRepo.findById(id).orElse(null);
    }

    public void deleteDoctor(@NonNull String id) {
        doctorRepo.deleteById(id);
    }
}