package com.example.Tech.Events.service;

import com.example.Tech.Events.entity.Event;
import com.example.Tech.Events.entity.Participant;
import com.example.Tech.Events.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public EventService(EventRepository eventRepository, CloudinaryService cloudinaryService) {
        this.eventRepository = eventRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public Event createEvent(Event event, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(imageFile);
            event.setImageUrl(imageUrl);
        }
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(String id) {
        return eventRepository.findById(id).orElse(null);
    }

    public void deleteEvent(String id) throws IOException {
        Event event = eventRepository.findById(id).orElse(null);
        if (event != null && event.getImagePublicId() != null) {
            cloudinaryService.deleteImage(event.getImagePublicId());
        }
        eventRepository.deleteById(id);
    }

    public boolean registerParticipant(String eventId, Participant participant) {
        Event event = eventRepository.findById(eventId).orElse(null);
        if (event != null && event.getCurrentParticipants() < event.getMaxParticipants()) {
            event.getRegisterdParticipants().add(participant);
            event.setCurrentParticipants(event.getCurrentParticipants() + 1);
            eventRepository.save(event);
            return true;
        }
        return false;
    }
}