package com.petstagram.socialmedia.configuration.mapper.mapping;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.dto.comment.CommentDto;
import com.petstagram.socialmedia.entity.comment.Comment;

public class CommentMapper extends Mapper<Comment, CommentDto> {
    public CommentMapper() {
        super(Comment.class, CommentDto.class);
    }
}
