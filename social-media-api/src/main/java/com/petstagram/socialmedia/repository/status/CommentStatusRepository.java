package com.petstagram.socialmedia.repository.status;

import com.petstagram.socialmedia.entity.status.CommentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentStatusRepository extends JpaRepository<CommentStatus, UUID> {
}
