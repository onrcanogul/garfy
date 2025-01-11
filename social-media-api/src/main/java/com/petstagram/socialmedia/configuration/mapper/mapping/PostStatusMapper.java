package com.petstagram.socialmedia.configuration.mapper.mapping;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.dto.status.PostStatusDto;
import com.petstagram.socialmedia.entity.status.PostStatus;

public class PostStatusMapper extends Mapper<PostStatus, PostStatusDto> {
    protected PostStatusMapper() {
        super(PostStatus.class, PostStatusDto.class);
    }
}
