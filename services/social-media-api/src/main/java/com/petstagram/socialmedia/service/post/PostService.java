package com.petstagram.socialmedia.service.post;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.service.base.BaseService;

import java.util.List;
import java.util.UUID;

public interface PostService extends BaseService<Post, PostDto> {
    ServiceResponse<List<PostDto>> getByUser(UUID userId);
    ServiceResponse<PostDto> create(PostDto model);
    ServiceResponse<String> like(UUID postId, UUID userId);
}
