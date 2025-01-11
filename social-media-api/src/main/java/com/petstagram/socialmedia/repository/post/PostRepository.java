package com.petstagram.socialmedia.repository.post;

import com.petstagram.socialmedia.entity.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
}
