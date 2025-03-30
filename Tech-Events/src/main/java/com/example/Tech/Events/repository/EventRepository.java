package com.example.Tech.Events.repository;

import com.example.Tech.Events.entity.Event;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByOrganizerId(String organizerId);
    List<Event> findByTagsIn(List<String> tags);
    List<Event> findByEventDateAfter(Date date); // Upcoming events
}