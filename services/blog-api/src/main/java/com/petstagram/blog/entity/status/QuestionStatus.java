package com.petstagram.blog.entity.status;

import jakarta.persistence.Entity;

import java.util.UUID;

@Entity
public class QuestionStatus extends Status {
    private UUID questionId;

    public UUID getQuestionId() {
        return questionId;
    }

    public void setQuestionId(UUID questionId) {
        this.questionId = questionId;
    }
}
