package com.petstagram.blog.dto.view;

import com.petstagram.blog.dto.base.BaseDto;

import java.util.UUID;

public class QuestionViewDto extends BaseDto {
    private UUID userId;
    private UUID questionId;

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
