package com.petstagram.socialmedia.dto.status;

import java.util.UUID;

public class LikeDto {
    private UUID userId;
    private UUID id;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
