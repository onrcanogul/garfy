package com.petstagram.socialmedia.repository.story;

import com.petstagram.socialmedia.entity.story.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StoryRepository extends JpaRepository<Story, UUID> {
}
