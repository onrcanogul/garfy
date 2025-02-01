package com.petstagram.socialmedia.entity.status;

import com.petstagram.socialmedia.entity.post.Post;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
public class PostStatus extends Status {
    private UUID postId;

    public UUID getPostId() {
        return postId;
    }

    public void setPostId(UUID postId) {
        this.postId = postId;
    }
}
