package com.petstagram.socialmedia.service.post.impl;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.entity.status.PostStatus;
import com.petstagram.socialmedia.repository.status.PostStatusRepository;
import com.petstagram.socialmedia.service.post.PostStatusService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostStatusServiceImpl implements PostStatusService {
    private final PostStatusRepository repository;
    public PostStatusServiceImpl(PostStatusRepository repository) {
        this.repository = repository;
    }
    @Override
    public ServiceResponse<Void> like(UUID userId, UUID postId) {
        PostStatus status = repository.findByPostId(postId).orElseThrow(() -> new NullPointerException());
        List<UUID> users =  status.getUsers();
        users.add(userId);
        repository.save(status);
        return ServiceResponse.success(200);
    }
}
