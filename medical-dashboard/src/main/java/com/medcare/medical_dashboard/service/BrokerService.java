package com.medcare.medical_dashboard.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.medcare.medical_dashboard.model.Broker;
import com.medcare.medical_dashboard.repository.BrokerRepository;

@Service
public class BrokerService {

    private final BrokerRepository brokerRepo;

    @Autowired
    public BrokerService(BrokerRepository brokerRepo) {
        this.brokerRepo = brokerRepo;
    }

    public List<Broker> getAllBrokers() {
        return brokerRepo.findAll();
    }

    public Broker addBroker(@NonNull Broker broker) {
        return brokerRepo.save(broker);
    }

    public Broker getBrokerById(@NonNull String id) {
        return brokerRepo.findById(id).orElse(null);
    }

    public void deleteBroker(@NonNull String id) {
        brokerRepo.deleteById(id);
    }
}