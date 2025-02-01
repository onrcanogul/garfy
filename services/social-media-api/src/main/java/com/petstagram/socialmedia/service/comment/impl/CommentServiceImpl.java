package com.petstagram.socialmedia.service.comment.impl;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.dto.comment.CommentDto;
import com.petstagram.socialmedia.dto.status.CommentStatusDto;
import com.petstagram.socialmedia.entity.comment.Comment;
import com.petstagram.socialmedia.entity.status.CommentStatus;
import com.petstagram.socialmedia.repository.comment.CommentRepository;
import com.petstagram.socialmedia.repository.status.CommentStatusRepository;
import com.petstagram.socialmedia.service.base.impl.BaseServiceImpl;
import com.petstagram.socialmedia.service.comment.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class CommentServiceImpl extends BaseServiceImpl<Comment, CommentDto> implements CommentService {

    private final CommentStatusRepository statusRepository;
    private final CommentRepository repository;
    private final Mapper<Comment, CommentDto> mapper;


    public CommentServiceImpl(CommentStatusRepository statusRepository, CommentRepository repository, Mapper<Comment, CommentDto> mapper) {
        super(repository, mapper);
        this.statusRepository = statusRepository;
        this.repository = repository;
        this.mapper = mapper;
    }
    public ServiceResponse<List<CommentDto>> get(int page, int size, UUID postId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Comment> comments = repository.findByPostId(postId, pageable);
        List<CommentDto> commentDtos = comments.getContent()
                .stream()
                .map(mapper::toDto)
                .toList();
        return ServiceResponse.success(commentDtos, 200);
    }
    @Override
    public ServiceResponse<CommentDto> create(CommentDto model) {
        Comment comment = mapper.toEntity(model);
        Comment createdComment = repository.save(comment);
        CommentStatus commentStatus = new CommentStatus();
        commentStatus.setCommentId(createdComment.getId());
        comment.setStatus(commentStatus);
        statusRepository.save(commentStatus);
        return ServiceResponse.success(mapper.toDto(comment), 200);
    }
    @Override
    public ServiceResponse<String> like(UUID commentId, UUID userId) {
        String status;
        Comment comment = repository.findById(commentId).orElseThrow();
        boolean isExist = comment.getStatus().getUsers().contains(userId);
        if(!isExist) {
            status = "Like";
            comment.getStatus().getUsers().add(userId);
        }
        else {
            status = "Dislike";
            comment.getStatus().getUsers().remove(userId);
        }
        repository.save(comment);
        return ServiceResponse.success(status, 200);
    }
    @Override
    protected void updateEntity(CommentDto dto, Comment entity) {
        entity.setContent(dto.getContent());
        entity.setCreatedDate(dto.getCreatedDate());
        entity.setUpdatedDate(dto.getUpdatedDate());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setUpdatedBy(dto.getUpdatedBy());
    }
}


