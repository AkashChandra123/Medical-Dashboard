package com.medcare.medical_dashboard.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medcare.medical_dashboard.model.Patient;
import com.medcare.medical_dashboard.repository.PatientRepository;

@Service
public class PatientService {

    private final PatientRepository patientRepo;

    @Autowired
    public PatientService(PatientRepository patientRepo) {
        this.patientRepo = patientRepo;
    }

    /**
     * Fetch all patients from the database.
     */
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    /**
     * Register a new patient. Prevents duplicate registration by email.
     * Normalizes email before checking and saving.
     */
    public Patient registerPatient(Patient patient) {
        if (patient.getEmail() == null || patient.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        // Normalize email (trim + lowercase)
        String normalizedEmail = patient.getEmail().trim().toLowerCase();

        if (patientRepo.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("Patient with email " + normalizedEmail + " already exists.");
        }

        patient.setEmail(normalizedEmail);
        patient.setRegisteredDate(LocalDateTime.now());
        patient.setActive(true);

        return patientRepo.save(patient);
    }

    /**
     * Get a patient by ID.
     */
    public Optional<Patient> getPatientById(String id) {
        Objects.requireNonNull(id, "id cannot be null");
        return patientRepo.findById(id);
    }

    /**
     * Get a patient by email.
     */
    public Optional<Patient> getPatientByEmail(String email) {
        return patientRepo.findByEmail(email.trim().toLowerCase());
    }

    /**
     * Delete a patient by ID. Throws exception if patient does not exist.
     */
    public void deletePatient(String id) {
        if (!patientRepo.existsById(id)) {
            throw new IllegalArgumentException("Patient with ID " + id + " does not exist.");
        }
        patientRepo.deleteById(id);
    }
}