package com.petstagram.blog.service.question.impl;

import com.petstagram.blog.configuration.mapper.Mapper;
import com.petstagram.blog.dto.question.QuestionDto;
import com.petstagram.blog.entity.question.Question;
import com.petstagram.blog.repository.base.BaseRepository;
import com.petstagram.blog.service.base.impl.BaseServiceImpl;
import com.petstagram.blog.service.question.QuestionService;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl extends BaseServiceImpl<Question, QuestionDto> implements QuestionService {
    public QuestionServiceImpl(BaseRepository<Question> repository, Mapper<Question, QuestionDto> mapper) {
        super(repository, mapper);
    }

    @Override
    protected void updateEntity(QuestionDto dto, Question entity) {
        entity.setContent(dto.getContent());
        entity.setTitle(dto.getTitle());
    }
}
