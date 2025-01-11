package com.petstagram.socialmedia.repository.comment;

import com.petstagram.socialmedia.entity.comment.Comment;
import com.petstagram.socialmedia.repository.base.BaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentRepository extends BaseRepository<Comment> {
    Page<Comment> findByPostId(UUID postId, Pageable pageable);
}
