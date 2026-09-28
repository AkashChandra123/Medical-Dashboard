package com.medcare.medical_dashboard.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.medcare.medical_dashboard.model.Doctor;

public interface DoctorRepository extends MongoRepository<Doctor, String> {

    // For login
    Doctor findByEmail(String email);

    // Queries that match your new Doctor fields
    List<Doctor> findBySpecialization(String specialization);
    List<Doctor> findByHospitalId(String hospitalId);
    List<Doctor> findByNameContainingIgnoreCase(String name);
    List<Doctor> findByAvailable(boolean available);
}