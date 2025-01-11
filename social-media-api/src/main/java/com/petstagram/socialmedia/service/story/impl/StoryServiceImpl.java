package com.petstagram.socialmedia.service.story.impl;

import com.petstagram.socialmedia.configuration.mapper.Mapping;
import com.petstagram.socialmedia.dto.story.StoryDto;
import com.petstagram.socialmedia.entity.story.Story;
import com.petstagram.socialmedia.repository.base.BaseRepository;
import com.petstagram.socialmedia.service.base.impl.BaseServiceImpl;

public class StoryServiceImpl extends BaseServiceImpl<Story, StoryDto> {
    public StoryServiceImpl(BaseRepository<Story> repository, Mapping<Story, StoryDto> mapper) {
        super(repository, mapper);
    }

    @Override
    protected void updateEntity(StoryDto dto, Story entity) {
    }
}
