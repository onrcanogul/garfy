package com.petstagram.blog.configuration.auditing;

import com.petstagram.blog.entity.base.BaseEntity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.time.LocalDateTime;

public class BaseEntityListener {
    @PrePersist
    public void prePersist(BaseEntity entity) {
        entity.setCreatedDate(LocalDateTime.now());
        entity.setCreatedBy(getCurrentUsername());
    }

    @PreUpdate
    public void preUpdate(BaseEntity entity) {
        entity.setUpdatedDate(LocalDateTime.now());
        entity.setUpdatedBy(getCurrentUsername());
    }

    private String getCurrentUsername() {
        return "oogul"; // will be dynamic
    }
}
