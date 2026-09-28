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

import com.medcare.medical_dashboard.model.Broker;
import com.medcare.medical_dashboard.repository.BrokerRepository;

@RestController
@RequestMapping("/api/brokers")
@CrossOrigin(origins = "*")
public class BrokerController {

    @Autowired
    private BrokerRepository brokerRepo;

    @GetMapping
    public List<Broker> getAllBrokers() {
        return brokerRepo.findAll();
    }

    @SuppressWarnings("null")
    @PostMapping
    public Broker addBroker(@RequestBody Broker broker) {
        return brokerRepo.save(broker);
    }

    @SuppressWarnings("null")
    @GetMapping("/{id}")
    public Broker getBrokerById(@PathVariable String id) {
        return brokerRepo.findById(id).orElse(null);
    }

    @SuppressWarnings("null")
    @DeleteMapping("/{id}")
    public void deleteBroker(@PathVariable String id) {
        brokerRepo.deleteById(id);
    }
}