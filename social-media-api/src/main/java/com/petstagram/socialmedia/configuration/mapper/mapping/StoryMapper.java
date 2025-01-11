package com.petstagram.socialmedia.configuration.mapper.mapping;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.dto.story.StoryDto;
import com.petstagram.socialmedia.entity.story.Story;

public class StoryMapper extends Mapper<Story, StoryDto> {
    public StoryMapper() {
        super(Story.class, StoryDto.class);
    }
}
