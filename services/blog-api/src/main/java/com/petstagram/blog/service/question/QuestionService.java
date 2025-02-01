package com.petstagram.blog.service.question;

import com.petstagram.blog.configuration.response.NoContent;
import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.dto.question.QuestionDto;
import com.petstagram.blog.entity.question.Question;
import com.petstagram.blog.service.base.BaseService;

import java.util.List;
import java.util.UUID;

public interface QuestionService extends BaseService<Question, QuestionDto> {
    ServiceResponse<List<QuestionDto>> get(int page, int size);
    ServiceResponse<List<QuestionDto>> getByTag(int page, int size, UUID tagId);
    ServiceResponse<List<QuestionDto>> getByUser(int page, int size, UUID userId);
    ServiceResponse<QuestionDto> add(QuestionDto dto);
    ServiceResponse<NoContent> like(UUID questionId, UUID userId);
    ServiceResponse<NoContent> addSeen(UUID questionId, UUID userId);
    ServiceResponse<NoContent> delete(UUID id);
}
