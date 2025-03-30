package com.example.Tech.Events.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "participants")
@Data
@Getter
@Setter
public class Participant {

    @Id
    private String id;

    @NonNull
    private String name;

    @NonNull
    private String email;

    @NonNull
    private String password;

    @NonNull
    private String university;

    @NonNull
    private String course;

    private String imgUrl;

    private boolean currentlyStudyingOrNot;

    private int totaleventsRegisterd;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public @NonNull String getName() {
        return name;
    }

    public void setName(@NonNull String name) {
        this.name = name;
    }

    public @NonNull String getEmail() {
        return email;
    }

    public void setEmail(@NonNull String email) {
        this.email = email;
    }

    public @NonNull String getPassword() {
        return password;
    }

    public void setPassword(@NonNull String password) {
        this.password = password;
    }

    public @NonNull String getUniversity() {
        return university;
    }

    public void setUniversity(@NonNull String university) {
        this.university = university;
    }

    public @NonNull String getCourse() {
        return course;
    }

    public void setCourse(@NonNull String course) {
        this.course = course;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public boolean isCurrentlyStudyingOrNot() {
        return currentlyStudyingOrNot;
    }

    public void setCurrentlyStudyingOrNot(boolean currentlyStudyingOrNot) {
        this.currentlyStudyingOrNot = currentlyStudyingOrNot;
    }

    public int getTotaleventsRegisterd() {
        return totaleventsRegisterd;
    }

    public void setTotaleventsRegisterd(int totaleventsRegisterd) {
        this.totaleventsRegisterd = totaleventsRegisterd;
    }

    public List<Event> getRegisterdEvents() {
        return registerdEvents;
    }

    public void setRegisterdEvents(List<Event> registerdEvents) {
        this.registerdEvents = registerdEvents;
    }

    @DBRef
    private List<Event> registerdEvents;

}
