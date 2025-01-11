package com.petstagram.socialmedia.entity.post;

import com.petstagram.socialmedia.entity.comment.Comment;
import com.petstagram.socialmedia.entity.base.BaseEntity;
import com.petstagram.socialmedia.entity.status.PostStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Post extends BaseEntity {
    private String title;
    private String description;
    @OneToMany(mappedBy = "comments", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();
    @OneToOne(mappedBy = "post_status", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private PostStatus status;

}
