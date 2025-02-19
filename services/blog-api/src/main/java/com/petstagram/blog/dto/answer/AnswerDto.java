package com.petstagram.blog.dto.answer;

import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.entity.status.AnswerStatus;

import java.util.UUID;

public class AnswerDto extends BaseDto {
    private String content;
    private String userName;
    private UUID questionId;
    private AnswerStatus status;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UUID getQuestionId() {
        return questionId;
    }

    public void setQuestionId(UUID questionId) {
        this.questionId = questionId;
    }

    public AnswerStatus getStatus() {
        return status;
    }

    public void setStatus(AnswerStatus status) {
        this.status = status;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
