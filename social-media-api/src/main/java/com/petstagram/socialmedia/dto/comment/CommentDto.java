package com.petstagram.socialmedia.dto.comment;

import com.petstagram.socialmedia.dto.base.BaseDto;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.entity.status.CommentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto extends BaseDto {
    private UUID userId;
    private String content;
    private Post post;
    private CommentStatus status;
}
