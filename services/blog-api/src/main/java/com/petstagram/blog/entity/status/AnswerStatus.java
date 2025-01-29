package com.petstagram.blog.entity.status;

import jakarta.persistence.Entity;

import java.util.UUID;

@Entity
public class AnswerStatus extends Status {
    private UUID answerId;

    public UUID getAnswerId() {
        return answerId;
    }

    public void setAnswerId(UUID answerId) {
        this.answerId = answerId;
    }
}
