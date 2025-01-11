package com.petstagram.socialmedia.configuration.mapper.mapping;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.entity.post.Post;
import org.springframework.stereotype.Component;

@Component
public class PostMapper extends Mapper<Post, PostDto> {
    public PostMapper() {
        super(Post.class, PostDto.class);
    }
}
