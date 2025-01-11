package com.petstagram.socialmedia.service.comment.impl;

import com.petstagram.socialmedia.configuration.mapper.mapping.CommentMapper;
import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.dto.comment.CommentDto;
import com.petstagram.socialmedia.entity.comment.Comment;
import com.petstagram.socialmedia.repository.comment.CommentRepository;
import com.petstagram.socialmedia.service.comment.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repository;
    private final CommentMapper mapper;

    public CommentServiceImpl(CommentRepository repository, CommentMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public ServiceResponse<List<CommentDto>> get(UUID postId) {
        List<CommentDto> comments = repository.findByPost(postId).stream().map(mapper::toDto).toList();
        return ServiceResponse.success(comments, 200);
    }

    @Override
    public ServiceResponse<CommentDto> create(CommentDto model) {
        Comment comment = mapper.toEntity(model);
        Comment createdComment = repository.save(comment);
        return ServiceResponse.success(mapper.toDto(createdComment), 201);
    }

    @Override
    public ServiceResponse<CommentDto> update(CommentDto model) {
        Comment comment = repository.findById(model.getId()).orElseThrow(() -> new NullPointerException());
        comment.setContent(model.getContent());
        comment.setStatus(model.getStatus());
        comment.setCreatedDate(model.getCreatedDate());
        comment.setUpdatedDate(model.getUpdatedDate());
        comment.setCreatedBy(model.getCreatedBy());
        comment.setUpdatedBy(model.getUpdatedBy());
        Comment updatedComment = repository.save(comment);
        return ServiceResponse.success(mapper.toDto(updatedComment), 200);
    }

    @Override
    public ServiceResponse<Void> delete(UUID id) {
        Comment comment = repository.findById(id).orElseThrow(() -> new NullPointerException());
        repository.delete(comment);
        return ServiceResponse.success(204);
    }
}
