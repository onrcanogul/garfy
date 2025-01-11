package com.petstagram.socialmedia.repository.status;

import com.petstagram.socialmedia.entity.status.PostStatus;
import com.petstagram.socialmedia.repository.base.BaseRepository;

import java.util.Optional;
import java.util.UUID;

public interface PostStatusRepository extends BaseRepository<PostStatus> {
    Optional<PostStatus> findByPostId(UUID postId);
}
