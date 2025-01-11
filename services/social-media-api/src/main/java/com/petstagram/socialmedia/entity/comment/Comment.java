package com.petstagram.socialmedia.entity.comment;

import com.petstagram.socialmedia.entity.base.BaseEntity;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.entity.status.CommentStatus;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Comment extends BaseEntity {
    private UUID userId;
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;
    @OneToOne(mappedBy = "comment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private CommentStatus status;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public CommentStatus getStatus() {
        return status;
    }

    public void setStatus(CommentStatus status) {
        this.status = status;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
