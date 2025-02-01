package com.petstagram.socialmedia.entity.status;

import jakarta.persistence.Entity;

import java.util.UUID;

@Entity
public class CommentStatus extends Status {
    private UUID commentId;

    public UUID getCommentId() {
        return commentId;
    }

    public void setCommentId(UUID commentId) {
        this.commentId = commentId;
    }
}
