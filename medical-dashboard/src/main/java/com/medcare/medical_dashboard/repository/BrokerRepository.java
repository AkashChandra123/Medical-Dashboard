package com.medcare.medical_dashboard.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.medcare.medical_dashboard.model.Broker;

public interface BrokerRepository extends MongoRepository<Broker, String> {
    Optional<Broker> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Broker> findByPhone(String phone);
    List<Broker> findBySpecializationsContaining(String specialization);
    List<Broker> findByLanguagesContaining(String language);
    List<Broker> findByRatingGreaterThanEqualOrderByRatingDesc(double rating);
    List<Broker> findByNameContainingIgnoreCase(String name);
}