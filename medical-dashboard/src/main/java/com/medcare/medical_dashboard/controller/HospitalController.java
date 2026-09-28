package com.medcare.medical_dashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medcare.medical_dashboard.model.Hospital;
import com.medcare.medical_dashboard.repository.HospitalRepository;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "*")
public class HospitalController {

    @Autowired
    private HospitalRepository hospitalRepo;

    @GetMapping
    public List<Hospital> getAllHospitals() {
        return hospitalRepo.findAll();
    }

    @SuppressWarnings("null")
    @PostMapping
    public Hospital addHospital(@RequestBody Hospital hospital) {
        return hospitalRepo.save(hospital);
    }

    @SuppressWarnings("null")
    @GetMapping("/{id}")
    public Hospital getHospitalById(@PathVariable String id) {
        return hospitalRepo.findById(id).orElse(null);
    }

    @SuppressWarnings("null")
    @DeleteMapping("/{id}")
    public void deleteHospital(@PathVariable String id) {
        hospitalRepo.deleteById(id);
    }
}