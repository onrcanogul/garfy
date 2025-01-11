package com.petstagram.socialmedia.repository.status;

import com.petstagram.socialmedia.entity.status.CommentStatus;
import com.petstagram.socialmedia.repository.base.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CommentStatusRepository extends BaseRepository<CommentStatus> {
    Optional<CommentStatus> findByCommentId(UUID commentId);
}
