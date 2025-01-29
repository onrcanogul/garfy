package com.petstagram.blog.entity.status;

import com.petstagram.blog.entity.base.BaseEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@MappedSuperclass
public abstract class Status extends BaseEntity {
    @ElementCollection
    @Column(name = "users")
    private List<UUID> users = new ArrayList<>();

    public List<UUID> getUsers() {
        return users;
    }

    public void setUsers(List<UUID> userIds) {
        this.users = userIds;
    }
}
