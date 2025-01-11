package com.petstagram.socialmedia.entity.status;

import com.petstagram.socialmedia.entity.comment.Comment;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CommentStatus extends Status {
    @OneToOne
    @JoinColumn(name = "comment_id", referencedColumnName = "id")
    private Comment comment;
}
