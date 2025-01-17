package com.petstagram.blog.dto.answer;

import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.dto.question.QuestionDto;

import java.util.UUID;

public class AnswerDto extends BaseDto {
    private String content;
    private UUID userId;
    private QuestionDto question;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

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
