package com.example.Tech.Events.controller;

import com.example.Tech.Events.entity.Event;
import com.example.Tech.Events.entity.Participant;
import com.example.Tech.Events.service.CloudinaryService;
import com.example.Tech.Events.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public EventController(EventService eventService, CloudinaryService cloudinaryService) {
        this.eventService = eventService;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(
            @RequestPart("event") Event event,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            event.setImageUrl(imageUrl);
        }
        Event createdEvent = eventService.createEvent(event,image);
        return ResponseEntity.ok(createdEvent);
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable String id) {
        Event event = eventService.getEventById(id);
        return event != null ? ResponseEntity.ok(event) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable String id) throws IOException {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{eventId}/register")
    public ResponseEntity<String> registerParticipant(
            @PathVariable String eventId,
            @RequestBody Participant participant
    ) {
        boolean success = eventService.registerParticipant(eventId, participant);
        return success ?
                ResponseEntity.ok("Registration successful") :
                ResponseEntity.badRequest().body("Event is full");
    }
}