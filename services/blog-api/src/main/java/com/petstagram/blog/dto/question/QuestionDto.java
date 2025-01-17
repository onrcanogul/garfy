package com.petstagram.blog.dto.question;

import com.petstagram.blog.dto.answer.AnswerDto;
import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.dto.tag.TagDto;
import com.petstagram.blog.dto.view.QuestionViewDto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class QuestionDto extends BaseDto {
    private UUID userId;
    private String content;
    private String title;
    private List<AnswerDto> answers = new ArrayList<>();
    private List<QuestionViewDto> views = new ArrayList<>();
    private List<TagDto> tags = new ArrayList<>();

    public List<AnswerDto> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerDto> answers) {
        this.answers = answers;
    }

    public List<TagDto> getTags() {
        return tags;
    }

    public void setTags(List<TagDto> tags) {
        this.tags = tags;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public List<QuestionViewDto> getViews() {
        return views;
    }

    public void setViews(List<QuestionViewDto> views) {
        this.views = views;
    }
}
