package com.example.Tech.Events.repository;

import com.example.Tech.Events.entity.Participant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipantRepository extends MongoRepository<Participant, String> {
    Optional<Participant> findByEmail(String email);
}