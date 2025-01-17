package com.petstagram.blog.dto.view;

import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.dto.question.QuestionDto;

import java.util.UUID;

public class QuestionViewDto extends BaseDto {
    private UUID userId;
    private QuestionDto question;

    public QuestionDto getQuestion() {
        return question;
    }

    public void setQuestion(QuestionDto question) {
        this.question = question;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
