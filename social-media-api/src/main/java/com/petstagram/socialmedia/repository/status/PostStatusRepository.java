package com.petstagram.socialmedia.repository.status;

import com.petstagram.socialmedia.entity.status.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostStatusRepository extends JpaRepository<PostStatus, UUID> {
}
