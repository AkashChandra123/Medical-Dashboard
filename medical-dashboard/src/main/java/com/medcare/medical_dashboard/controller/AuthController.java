package com.medcare.medical_dashboard.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import com.medcare.medical_dashboard.repository.HospitalRepository;
import com.medcare.medical_dashboard.repository.DoctorRepository;
import com.medcare.medical_dashboard.model.Hospital;
import com.medcare.medical_dashboard.model.Doctor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private HospitalRepository hospitalRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    @PostMapping("/hospital-login")
    public ResponseEntity<?> hospitalLogin(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Hospital hospital = hospitalRepo.findByEmail(email);
        if (hospital != null && hospital.getPassword().equals(password)) {
            return ResponseEntity.ok(hospital);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/doctor-login")
    public ResponseEntity<?> doctorLogin(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Doctor doctor = doctorRepo.findByEmail(email);
        if (doctor != null && doctor.getPassword().equals(password)) {
            return ResponseEntity.ok(doctor);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}