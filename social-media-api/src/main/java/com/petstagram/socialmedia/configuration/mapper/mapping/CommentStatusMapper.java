package com.petstagram.socialmedia.configuration.mapper.mapping;

import com.petstagram.socialmedia.configuration.mapper.Mapper;
import com.petstagram.socialmedia.dto.status.CommentStatusDto;
import com.petstagram.socialmedia.entity.status.CommentStatus;

public class CommentStatusMapper extends Mapper<CommentStatus, CommentStatusDto> {
    protected CommentStatusMapper() {
        super(CommentStatus.class, CommentStatusDto.class);
    }
}
