package com.petstagram.socialmedia.service.post;

import com.petstagram.socialmedia.configuration.response.ServiceResponse;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.service.base.BaseService;

public interface PostService extends BaseService<Post, PostDto> {
    ServiceResponse<PostDto> create(PostDto model);
}
