package com.petstagram.blog.entity.question;

import com.petstagram.blog.entity.answer.Answer;
import com.petstagram.blog.entity.base.BaseEntity;
import com.petstagram.blog.entity.tag.Tag;
import com.petstagram.blog.entity.view.QuestionView;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Question extends BaseEntity {
    private UUID userId;
    private String shortContent;
    private String content;
    private String title;
    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();
    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QuestionView> views = new ArrayList<>();

    @JoinTable(
            name = "question_tags",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Tag> tags = new ArrayList<>();

    public Question() {
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getShortContent() {
        return shortContent;
    }

    public void setShortContent(String shortContent) {
        this.shortContent = shortContent;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
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

    public List<QuestionView> getViews() {
        return views;
    }

    public void setViews(List<QuestionView> views) {
        this.views = views;
    }
}
