package com.example.Tech.Events.repository;

import com.example.Tech.Events.entity.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends MongoRepository<Organization, String> {
    Optional<Organization> findByEmail(String email);
    Optional<Organization> findByAdminEmail(String adminEmail);
    boolean existsByEmail(String email);
    boolean existsByAdminEmail(String adminEmail);
    List<Organization> findByNameContainingIgnoreCase(String name);
}