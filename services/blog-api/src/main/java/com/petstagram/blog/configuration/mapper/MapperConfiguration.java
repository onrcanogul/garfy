package com.petstagram.blog.configuration.mapper;


import com.petstagram.blog.dto.base.BaseDto;
import com.petstagram.blog.entity.base.BaseEntity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfiguration {

    @Bean
    public Mapper<BaseEntity, BaseDto> baseMapper() {
        return new Mapper<>(BaseEntity.class, BaseDto.class);
    }
//    @Bean
//    public Mapper<Comment, CommentDto> commentMapper() {
//        return new Mapper<>(Comment.class, CommentDto.class);
//    }
//    @Bean
//    public Mapper<Story, StoryDto> storyMapper() {
//        return new Mapper<>(Story.class, StoryDto.class);
//    }
//    @Bean
//    public Mapper<Post, PostDto> postMapper() {
//        return new Mapper<>(Post.class, PostDto.class);
//    }
//    @Bean
//    public Mapper<CommentStatus, CommentStatusDto> commentStatusMapper() {
//        return new Mapper<>(CommentStatus.class, CommentStatusDto.class);
//    }
//    @Bean
//    public Mapper<PostStatus, PostStatusDto> postStatusMapper() {
//        return new Mapper<>(PostStatus.class, PostStatusDto.class);
//    }
}
