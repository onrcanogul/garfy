package com.petstagram.blog.repository.status;

import com.petstagram.blog.entity.status.QuestionStatus;
import com.petstagram.blog.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface QuestionStatusRepository extends BaseRepository<QuestionStatus> {
    void deleteByQuestionId(UUID questionId);
}
