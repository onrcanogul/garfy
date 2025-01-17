package com.petstagram.blog.entity.answer;
import com.petstagram.blog.entity.base.BaseEntity;
import com.petstagram.blog.entity.question.Question;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.UUID;

@Entity
public class Answer extends BaseEntity {
    private String content;
    private UUID userId;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    public Answer(String content, Question question, UUID userId) {
        this.content = content;
        this.question = question;
        this.userId = userId;
    }

    public Answer(){

    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
