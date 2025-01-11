package com.petstagram.socialmedia.entity.comment;

import com.petstagram.socialmedia.entity.base.BaseEntity;
import com.petstagram.socialmedia.entity.post.Post;
import com.petstagram.socialmedia.entity.status.CommentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Comment extends BaseEntity {
    private UUID userId;
    private String content;
    @OneToOne
    @JoinColumn(name = "comment_id", referencedColumnName = "id")
    private Post post;
    @OneToOne(mappedBy = "comment_status", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private CommentStatus status;
}
