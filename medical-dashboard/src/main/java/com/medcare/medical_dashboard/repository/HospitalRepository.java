package com.medcare.medical_dashboard.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.medcare.medical_dashboard.model.Hospital;

@Repository
public interface HospitalRepository extends MongoRepository<Hospital, String> {

    // ✅ Find hospital by email (for login)
    Hospital findByEmail(String email);

    // ✅ Find hospitals by name
    List<Hospital> findByName(String name);

    // ✅ Find hospitals containing a specific department
    List<Hospital> findByDepartmentsContaining(String department);

    // ✅ Find hospitals that have a specific doctor ID
    List<Hospital> findByDoctorIdsContaining(String doctorId);
}