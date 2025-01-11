package com.petstagram.socialmedia.service.story;

import com.petstagram.socialmedia.dto.story.StoryDto;
import com.petstagram.socialmedia.entity.story.Story;
import com.petstagram.socialmedia.service.base.BaseService;
import org.springframework.stereotype.Service;

@Service
public interface StoryService extends BaseService<Story, StoryDto> {
}
