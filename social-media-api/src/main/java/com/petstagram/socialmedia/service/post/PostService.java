package com.petstagram.socialmedia.service.post;

import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.service.base.BaseService;
import org.springframework.stereotype.Service;

@Service
public interface PostService extends BaseService<Post, PostDto> {
}
