package com.petstagram.socialmedia.dto.status;

import java.util.UUID;

public class CommentStatusDto extends StatusDto {
    private UUID commentId;

    public UUID getCommentId() {
        return commentId;
    }

    public void setCommentId(UUID commentId) {
        this.commentId = commentId;
    }
}
