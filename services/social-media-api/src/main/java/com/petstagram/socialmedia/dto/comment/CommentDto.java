package com.petstagram.socialmedia.dto.comment;

import com.petstagram.socialmedia.dto.base.BaseDto;
import com.petstagram.socialmedia.dto.post.PostDto;
import com.petstagram.socialmedia.dto.status.CommentStatusDto;


import java.util.UUID;


public class CommentDto extends BaseDto {
    private UUID userId;
    private String content;
    private UUID postId;
    private CommentStatusDto status;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public CommentStatusDto getStatus() {
        return status;
    }

    public void setStatus(CommentStatusDto status) {
        this.status = status;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getPostId() {
        return postId;
    }

    public void setPostId(UUID postId) {
        this.postId = postId;
    }
}
