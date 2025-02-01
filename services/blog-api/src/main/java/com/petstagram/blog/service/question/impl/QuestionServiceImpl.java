package com.petstagram.blog.service.question.impl;

import com.petstagram.blog.configuration.mapper.Mapper;
import com.petstagram.blog.configuration.response.NoContent;
import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.dto.question.QuestionDto;
import com.petstagram.blog.entity.question.Question;
import com.petstagram.blog.entity.status.QuestionStatus;
import com.petstagram.blog.entity.view.QuestionView;
import com.petstagram.blog.repository.base.BaseRepository;
import com.petstagram.blog.repository.status.QuestionStatusRepository;
import com.petstagram.blog.repository.view.QuestionViewRepository;
import com.petstagram.blog.service.base.impl.BaseServiceImpl;
import com.petstagram.blog.service.grpc.GrpcClientService;
import com.petstagram.blog.service.question.QuestionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl extends BaseServiceImpl<Question, QuestionDto> implements QuestionService {
    private final BaseRepository<Question> repository;
    private final QuestionStatusRepository statusRepository;
    private final QuestionViewRepository viewRepository;
    private final Mapper<Question, QuestionDto> mapper;
    private final GrpcClientService grpcService;

    public QuestionServiceImpl(BaseRepository<Question> repository, QuestionStatusRepository statusRepository, QuestionViewRepository viewRepository, Mapper<Question, QuestionDto> mapper, GrpcClientService grpcService) {
        super(repository, mapper);
        this.repository = repository;
        this.statusRepository = statusRepository;
        this.viewRepository = viewRepository;
        this.grpcService = grpcService;
        this.mapper = mapper;
    }

    @Override
    public ServiceResponse<List<QuestionDto>> get(int page, int size) {
        List<QuestionDto> questions = repository
                .findAll()
                .stream()
                .skip((long) page * size)
                .limit(size)
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ServiceResponse.success(questions, 200);
    }

    @Override
    public ServiceResponse<List<QuestionDto>> getByTag(int page, int size, UUID tagId) {
        List<QuestionDto> questions = repository
                .findAll()
                .stream()
                .filter(q -> q.getTags().contains(tagId))
                .skip(page * size).limit(size)
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ServiceResponse.success(questions, 200);
    }

    @Override
    public ServiceResponse<List<QuestionDto>> getByUser(int page, int size, UUID userId) {
        List<QuestionDto> questions = repository
                .findAll()
                .stream()
                .filter(q -> q.getUserId() == userId)
                .skip(page * size).limit(size)
                .map(mapper::toDto)
                .collect(Collectors.toList());
        return ServiceResponse.success(questions, 200);
    }

    @Override
    public ServiceResponse<QuestionDto> add(QuestionDto dto) {
        Question question = mapper.toEntity(dto);
        Question createdQuestion = repository.save(question);
        QuestionStatus questionStatus = new QuestionStatus();
        questionStatus.setQuestionId(createdQuestion.getId());
        question.setStatus(questionStatus);
        statusRepository.save(questionStatus);
        return ServiceResponse.success(mapper.toDto(question), 200);
    }

    @Override
    public ServiceResponse<NoContent> like(UUID questionId, UUID userId) {
        Question question = repository.findById(questionId).orElseThrow();
        question.getStatus().getUsers().add(userId);
        repository.save(question);
        return ServiceResponse.success(204);
    }

    @Override
    public ServiceResponse<NoContent> addSeen(UUID questionId, UUID userId) {
        boolean isExist = repository.findAll()
                .stream()
                .anyMatch(q -> q.getViews().stream().anyMatch(p -> p.getUserId() == userId) && q.getId() == questionId);
        if(!isExist) {
            QuestionView qv = new QuestionView();
            qv.setUserId(userId);
            qv.setId(questionId);
            viewRepository.save(qv);
        }
        return ServiceResponse.success(204);
    }

    @Override
    public ServiceResponse<NoContent> delete(UUID id) { //cascade
        repository.deleteById(id);
        viewRepository.deleteByQuestionId(id);
        statusRepository.deleteByQuestionId(id);
        return ServiceResponse.success(204);
    }


    @Override
    protected void updateEntity(QuestionDto dto, Question entity) {
        entity.setContent(dto.getContent());
        entity.setTitle(dto.getTitle());
    }
}
