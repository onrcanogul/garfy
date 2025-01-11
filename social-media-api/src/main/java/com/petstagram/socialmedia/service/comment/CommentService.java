package com.petstagram.socialmedia.service.comment;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.dto.comment.CommentDto;

import java.util.List;
import java.util.UUID;

public interface CommentService {
    ServiceResponse<List<CommentDto>> get(UUID postId);
    ServiceResponse<CommentDto> create(CommentDto model);
    ServiceResponse<CommentDto> update(CommentDto model);
    ServiceResponse<Void> delete(UUID id);
}
