package com.petstagram.socialmedia.dto.post;

import com.petstagram.socialmedia.dto.base.BaseDto;
import com.petstagram.socialmedia.dto.comment.CommentDto;
import com.petstagram.socialmedia.dto.status.PostStatusDto;


import java.util.ArrayList;
import java.util.List;


public class PostDto extends BaseDto {
    private String title;
    private String description;
    private List<CommentDto> comments = new ArrayList<>();
    private PostStatusDto status;

    public List<CommentDto> getComments() {
        return comments;
    }

    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public PostStatusDto getStatus() {
        return status;
    }

    public void setStatus(PostStatusDto status) {
        this.status = status;
    }
}
