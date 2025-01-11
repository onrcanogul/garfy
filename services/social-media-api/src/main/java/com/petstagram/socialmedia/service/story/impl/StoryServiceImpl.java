package com.petstagram.socialmedia.service.story.impl;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.dto.story.StoryDto;
import com.petstagram.socialmedia.entity.story.Story;
import com.petstagram.socialmedia.repository.base.BaseRepository;
import com.petstagram.socialmedia.service.base.impl.BaseServiceImpl;
import com.petstagram.socialmedia.service.story.StoryService;
import org.springframework.stereotype.Service;

@Service
public class StoryServiceImpl extends BaseServiceImpl<Story, StoryDto> implements StoryService {
    public StoryServiceImpl(BaseRepository<Story> repository, Mapper<Story, StoryDto> mapper) {
        super(repository, mapper);
    }

    @Override
    protected void updateEntity(StoryDto dto, Story entity) {
    }
}
