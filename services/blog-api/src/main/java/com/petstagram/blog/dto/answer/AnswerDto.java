package com.petstagram.blog.dto.answer;

import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.entity.status.AnswerStatus;

import java.util.UUID;

public class AnswerDto extends BaseDto {
    private String content;
    private UUID userId;
    private UUID questionId;
    private AnswerStatus status;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getQuestionId() {
        return questionId;
    }

    public void setQuestionId(UUID questionId) {
        this.questionId = questionId;
    }
}
