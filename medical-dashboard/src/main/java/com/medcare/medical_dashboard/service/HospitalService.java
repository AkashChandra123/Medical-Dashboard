package com.medcare.medical_dashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.medcare.medical_dashboard.model.Hospital;
import com.medcare.medical_dashboard.repository.HospitalRepository;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepo;

    @Autowired
    public HospitalService(HospitalRepository hospitalRepo) {
        this.hospitalRepo = hospitalRepo;
    }

    public List<Hospital> getAllHospitals() {
        return hospitalRepo.findAll();
    }

    public Hospital addHospital(@NonNull Hospital hospital) {
        return hospitalRepo.save(hospital);
    }

    public Hospital getHospitalById(@NonNull String id) {
        return hospitalRepo.findById(id).orElse(null);
    }

    public void deleteHospital(@NonNull String id) {
        hospitalRepo.deleteById(id);
    }
}