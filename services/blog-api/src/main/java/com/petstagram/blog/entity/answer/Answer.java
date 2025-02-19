package com.petstagram.blog.entity.answer;
import com.petstagram.blog.entity.base.BaseEntity;
import com.petstagram.blog.entity.question.Question;
import com.petstagram.blog.entity.status.AnswerStatus;
import com.petstagram.blog.entity.status.QuestionStatus;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Answer extends BaseEntity {
    private String content;
    private String userName;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "answer_id")
    private AnswerStatus status;

    public Answer(String content, Question question, String userName) {
        this.content = content;
        this.question = question;
        this.userName = userName;
    }

    public Answer(){

    }

    //getter setters

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
//    public UUID getUserId() {
//        return userId;
//    }
//    public void setUserId(UUID userId) {
//        this.userId = userId;
//    }
    public AnswerStatus getStatus() { return status; }
    public void setStatus(AnswerStatus status) { this.status = status; }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
