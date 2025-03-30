package com.example.Tech.Events.entity;

import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "events")
@Data
public class Event {
    @Id
    private String id;

    @NonNull
    private String title;

    @NonNull
    private String description;

    @NonNull
    private Date eventDate;

    @NonNull
    private String location;

    @NonNull
    private int maxParticipants;

    private int currentParticipants=0;
    private String imagePublicId;
    private String imageUrl;
    private List<String> tags;
    private List<Speaker> speakers;
    private List<Judge> judges;
    private Prize prizes;

    @DBRef
    private List<Participant> registerdParticipants;

    @DBRef
    private Organization organizer;

    @Data
    public static class Speaker {
        private String name;
        private String company;
    }

    @Data
    public static class Judge {
        private String name;
        private String company;

    }

    @Data
    public static class Prize {
        private String first;
        private String second;
        private String third;

    }


    public boolean registerParticipant(Participant participant) {
        if (currentParticipants < maxParticipants) {
            registerdParticipants.add(participant);
            currentParticipants++;
            return true;
        }
        return false;
    }

    public boolean removeParticipant() {
        if (currentParticipants > 0) {
            currentParticipants--;
            return true;
        }
        return false;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public @NonNull String getTitle() {
        return title;
    }

    public void setTitle(@NonNull String title) {
        this.title = title;
    }

    public @NonNull String getDescription() {
        return description;
    }

    public void setDescription(@NonNull String description) {
        this.description = description;
    }

    public @NonNull Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(@NonNull Date eventDate) {
        this.eventDate = eventDate;
    }

    public @NonNull String getLocation() {
        return location;
    }

    public void setLocation(@NonNull String location) {
        this.location = location;
    }

    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public int getCurrentParticipants() {
        return currentParticipants;
    }

    public void setCurrentParticipants(int currentParticipants) {
        this.currentParticipants = currentParticipants;
    }

    public String getImagePublicId() {
        return imagePublicId;
    }

    public void setImagePublicId(String imagePublicId) {
        this.imagePublicId = imagePublicId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<Speaker> getSpeakers() {
        return speakers;
    }

    public void setSpeakers(List<Speaker> speakers) {
        this.speakers = speakers;
    }

    public List<Judge> getJudges() {
        return judges;
    }

    public void setJudges(List<Judge> judges) {
        this.judges = judges;
    }

    public Prize getPrizes() {
        return prizes;
    }

    public void setPrizes(Prize prizes) {
        this.prizes = prizes;
    }

    public List<Participant> getRegisterdParticipants() {
        return registerdParticipants;
    }

    public void setRegisterdParticipants(List<Participant> registerdParticipants) {
        this.registerdParticipants = registerdParticipants;
    }

    public Organization getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Organization organizer) {
        this.organizer = organizer;
    }
}