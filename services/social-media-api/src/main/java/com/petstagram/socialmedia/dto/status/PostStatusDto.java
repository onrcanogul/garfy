package com.petstagram.socialmedia.dto.status;

import com.petstagram.socialmedia.dto.post.PostDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

public class PostStatusDto extends StatusDto {
    private UUID postId;

    public UUID getPostId() {
        return postId;
    }

    public void setPostId(UUID postId) {
        this.postId = postId;
    }
}
