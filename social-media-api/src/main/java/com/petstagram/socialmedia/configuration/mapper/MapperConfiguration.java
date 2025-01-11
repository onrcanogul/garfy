package com.petstagram.socialmedia.configuration.mapper;

import com.petstagram.socialmedia.dto.base.BaseDto;
import com.petstagram.socialmedia.dto.comment.CommentDto;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.dto.status.CommentStatusDto;
import com.petstagram.socialmedia.dto.status.PostStatusDto;
import com.petstagram.socialmedia.dto.story.StoryDto;
import com.petstagram.socialmedia.entity.base.BaseEntity;
import com.petstagram.socialmedia.entity.comment.Comment;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.entity.status.CommentStatus;
import com.petstagram.socialmedia.entity.status.PostStatus;
import com.petstagram.socialmedia.entity.story.Story;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfiguration {

    @Bean
    public Mapper<BaseEntity, BaseDto> baseMapper() {
        return new Mapper<>(BaseEntity.class, BaseDto.class);
    }
    @Bean
    public Mapper<Comment, CommentDto> commentMapper() {
        return new Mapper<>(Comment.class, CommentDto.class);
    }
    @Bean
    public Mapper<Story, StoryDto> storyMapper() {
        return new Mapper<>(Story.class, StoryDto.class);
    }
    @Bean
    public Mapper<Post, PostDto> postMapper() {
        return new Mapper<>(Post.class, PostDto.class);
    }
    @Bean
    public Mapper<CommentStatus, CommentStatusDto> commentStatusMapper() {
        return new Mapper<>(CommentStatus.class, CommentStatusDto.class);
    }
    @Bean
    public Mapper<PostStatus, PostStatusDto> postStatusMapper() {
        return new Mapper<>(PostStatus.class, PostStatusDto.class);
    }
}
