package com.petstagram.socialmedia.service.post.impl;

import com.petstagram.socialmedia.configuration.mapper.Mapping;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.repository.base.BaseRepository;
import com.petstagram.socialmedia.service.base.impl.BaseServiceImpl;

import java.time.LocalDateTime;

public class PostServiceImpl extends BaseServiceImpl<Post, PostDto> {
    public PostServiceImpl(BaseRepository<Post> repository, Mapping<Post, PostDto> mapper) {
        super(repository, mapper);
    }

    @Override
    protected void updateEntity(PostDto dto, Post entity) {
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setUpdatedDate(LocalDateTime.now());
        entity.setCreatedDate(dto.getCreatedDate());
    }
}
