package com.petstagram.socialmedia.dto.post;

import com.petstagram.socialmedia.dto.base.BaseDto;
import com.petstagram.socialmedia.entity.comment.Comment;
import com.petstagram.socialmedia.entity.status.PostStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto extends BaseDto {
    private String title;
    private String description;
    private List<Comment> comments = new ArrayList<>();
    private PostStatus status;
}
