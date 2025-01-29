package com.petstagram.blog.repository.view;

import com.petstagram.blog.entity.view.QuestionView;
import com.petstagram.blog.repository.base.BaseRepository;

import java.util.UUID;

public interface QuestionViewRepository extends BaseRepository<QuestionView> {
    void deleteByQuestionId(UUID questionId);
}
