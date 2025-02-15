package com.petstagram.blog.dto.question;

import com.petstagram.blog.dto.answer.AnswerDto;
import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.dto.file.FileDto;
import com.petstagram.blog.dto.tag.TagDto;
import com.petstagram.blog.dto.view.QuestionViewDto;
import com.petstagram.blog.entity.status.QuestionStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class QuestionDto extends BaseDto {
    private UUID userId;
    private String content;
    private String shortContent;
    private String title;
    private List<AnswerDto> answers = new ArrayList<>();
    private List<QuestionViewDto> views = new ArrayList<>();
    private List<TagDto> tags = new ArrayList<>();
    private List<String> imageUrls = new ArrayList<>();
//    private GetResponse images;
    private QuestionStatus status;

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

    public QuestionStatus getStatus() {
        return status;
    }

    public void setStatus(QuestionStatus status) {
        this.status = status;
    }

    public String getShortContent() {
        return shortContent;
    }

    public void setShortContent(String shortContent) {
        this.shortContent = shortContent;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

//    public GetResponse getImages() {
//        return images;
//    }
//
//    public void setImages(GetResponse images) {
//        this.images = images;
//    }
}
