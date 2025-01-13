package com.petstagram.blog.service.answer.impl;

import com.petstagram.blog.configuration.mapper.Mapper;
import com.petstagram.blog.dto.answer.AnswerDto;
import com.petstagram.blog.entity.answer.Answer;
import com.petstagram.blog.repository.base.BaseRepository;
import com.petstagram.blog.service.answer.AnswerService;
import com.petstagram.blog.service.base.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class AnswerServiceImpl extends BaseServiceImpl<Answer, AnswerDto> implements AnswerService {
    private final Mapper<Answer, AnswerDto> mapper;
    public AnswerServiceImpl(BaseRepository<Answer> repository, Mapper<Answer, AnswerDto> mapper) {
        super(repository, mapper);
        this.mapper = mapper;
    }

    @Override
    protected void updateEntity(AnswerDto dto, Answer entity) {
        entity.setContent(dto.getContent());
    }
}
