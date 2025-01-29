package com.petstagram.blog.service.answer;

import com.petstagram.blog.configuration.response.ServiceResponse;
import com.petstagram.blog.dto.answer.AnswerDto;
import com.petstagram.blog.entity.answer.Answer;
import com.petstagram.blog.service.base.BaseService;

import java.util.UUID;

public interface AnswerService extends BaseService<Answer, AnswerDto> {
    ServiceResponse<AnswerDto> create(AnswerDto model);
    ServiceResponse<Void> like(UUID answerId, UUID userId);
}
