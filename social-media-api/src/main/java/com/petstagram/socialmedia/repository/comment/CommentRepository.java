package com.petstagram.socialmedia.repository.comment;

import com.petstagram.socialmedia.entity.comment.Comment;
import com.petstagram.socialmedia.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends BaseRepository<Comment> {
    List<Comment> findByPost(UUID postId);
}
