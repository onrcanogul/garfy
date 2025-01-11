package com.petstagram.socialmedia.service.comment;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.dto.comment.CommentDto;
import com.petstagram.socialmedia.entity.comment.Comment;
import com.petstagram.socialmedia.service.base.BaseService;

import java.util.List;
import java.util.UUID;

public interface CommentService extends BaseService<Comment, CommentDto> {
    ServiceResponse<List<CommentDto>> get(int page, int size, UUID postId);
}
