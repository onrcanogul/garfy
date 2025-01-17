package com.petstagram.blog.dto.tag;

import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.entity.question.Question;

import java.util.ArrayList;
import java.util.List;

public class TagDto extends BaseDto {
    private String name;
    private List<Question> questions = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}
