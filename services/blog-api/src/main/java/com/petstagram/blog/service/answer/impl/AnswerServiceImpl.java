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
import org.springframework.http.ResponseEntity;
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
    public ServiceResponse<Void> like(UUID answerId, UUID userId) {
        boolean isExist = repository
                .findAll()
                .stream()
                .anyMatch(a -> a.getStatus().getAnswerId() == answerId && a.getStatus().getUsers().contains(userId));
        if(!isExist) {
            Answer answer = repository.findById(answerId).orElseThrow();
            answer.getStatus().getUsers().add(userId);
            repository.save(answer);
        }
        return ServiceResponse.success(204);
    }

    @Override
    public ServiceResponse<AnswerDto> create(AnswerDto model) {
        Answer answer = new Answer();
        Answer createdAnswer = repository.save(answer);
        AnswerStatus status = new AnswerStatus();
        status.setAnswerId(createdAnswer.getId());
        AnswerStatus createdStatus = statusRepository.save(status);
        answer.setStatus(createdStatus);
        return ServiceResponse.success(mapper.toDto(answer), 200);
    }


    @Override
    protected void updateEntity(AnswerDto dto, Answer entity) {
        entity.setContent(dto.getContent());
    }
}
