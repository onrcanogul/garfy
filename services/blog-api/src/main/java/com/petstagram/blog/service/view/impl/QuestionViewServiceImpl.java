package com.petstagram.blog.service.view.impl;

import com.petstagram.blog.configuration.mapper.Mapper;
import com.petstagram.blog.dto.view.QuestionViewDto;
import com.petstagram.blog.entity.view.QuestionView;
import com.petstagram.blog.repository.base.BaseRepository;
import com.petstagram.blog.service.base.impl.BaseServiceImpl;
import com.petstagram.blog.service.view.QuestionViewService;
import org.springframework.stereotype.Service;

@Service
public class QuestionViewServiceImpl extends BaseServiceImpl<QuestionView, QuestionViewDto> implements QuestionViewService {
    public QuestionViewServiceImpl(BaseRepository<QuestionView> repository, Mapper<QuestionView, QuestionViewDto> mapper) {
        super(repository, mapper);
    }

    @Override
    protected void updateEntity(QuestionViewDto dto, QuestionView entity) {
        return;
    }
}
