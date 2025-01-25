package com.petstagram.socialmedia.entity.reels;

import com.petstagram.socialmedia.entity.base.BaseEntity;
import jakarta.persistence.Entity;

import java.util.UUID;

@Entity
public class Reels extends BaseEntity {
    private UUID userId;
    private String url;
    private String caption;
}
