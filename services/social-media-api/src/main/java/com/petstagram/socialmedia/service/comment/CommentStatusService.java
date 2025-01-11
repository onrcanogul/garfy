package com.petstagram.socialmedia.service.comment;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;

import java.util.UUID;

public interface CommentStatusService {
    ServiceResponse<Void> like(UUID commentId, UUID userId);
}
