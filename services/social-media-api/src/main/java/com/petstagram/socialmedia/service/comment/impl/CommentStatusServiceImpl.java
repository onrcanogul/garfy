package com.petstagram.socialmedia.service.comment.impl;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.entity.status.CommentStatus;
import com.petstagram.socialmedia.repository.status.CommentStatusRepository;
import com.petstagram.socialmedia.service.comment.CommentStatusService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CommentStatusServiceImpl implements CommentStatusService {
    private final CommentStatusRepository repository;
    public CommentStatusServiceImpl(CommentStatusRepository repository) {
        this.repository = repository;
    }
    @Override
    public ServiceResponse<Void> like(UUID commentId, UUID userId) {
        CommentStatus status = repository.findByCommentId(commentId).orElseThrow(() -> new NullPointerException());
        status.getUsers().add(userId);
        CommentStatus updatedStatus = repository.save(status);
        return ServiceResponse.success(204);
    }
}
