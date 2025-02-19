package com.petstagram.blog.service.answer.impl;

import com.petstagram.blog.configuration.mapper.Mapper;
import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.dto.answer.AnswerDto;
import com.petstagram.blog.entity.answer.Answer;
import com.petstagram.blog.entity.status.AnswerStatus;
import com.petstagram.blog.repository.base.BaseRepository;
import com.petstagram.blog.repository.status.AnswerStatusRepository;
import com.petstagram.blog.service.answer.AnswerService;
import com.petstagram.blog.service.base.impl.BaseServiceImpl;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AnswerServiceImpl extends BaseServiceImpl<Answer, AnswerDto> implements AnswerService {
    private final Mapper<Answer, AnswerDto> mapper;
    private final BaseRepository<Answer> repository;
    private final AnswerStatusRepository statusRepository;
    public AnswerServiceImpl(BaseRepository<Answer> repository, Mapper<Answer, AnswerDto> mapper, AnswerStatusRepository statusRepository) {
        super(repository, mapper);
        this.mapper = mapper;
        this.repository = repository;
        this.statusRepository = statusRepository;
    }

    @Override
    public ServiceResponse<String> like(UUID answerId, String userId) {
        String status;
        Answer answer = repository.findById(answerId).orElseThrow();
        boolean isExist = answer.getStatus().getUsers().contains(userId);
        if (!isExist) {
            status = "Like";
            answer.getStatus().getUsers().add(userId);
        } else {
            status = "Dislike";
            answer.getStatus().getUsers().remove(userId);
        }
        repository.save(answer);
        return ServiceResponse.success(status, 200);
    }

    @Override
    public ServiceResponse<AnswerDto> create(AnswerDto model) {
        Answer answer = mapper.toEntity(model);
        Answer createdAnswer = repository.save(answer);
        AnswerStatus status = new AnswerStatus();
        status.setAnswerId(createdAnswer.getId());
        answer.setStatus(status);
        statusRepository.save(status);
        return ServiceResponse.success(mapper.toDto(createdAnswer), 200);
    }


    @Override
    protected void updateEntity(AnswerDto dto, Answer entity) {
        entity.setContent(dto.getContent());
    }
}
