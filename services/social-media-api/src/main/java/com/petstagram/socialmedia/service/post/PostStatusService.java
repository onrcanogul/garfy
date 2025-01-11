package com.petstagram.socialmedia.service.post;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface PostStatusService {
    ServiceResponse<Void> like(UUID userId, UUID postId);
}
