package com.petstagram.socialmedia.entity.status;

import com.petstagram.socialmedia.entity.base.BaseEntity;
import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@MappedSuperclass
public abstract class Status extends BaseEntity {
    @ElementCollection
    @CollectionTable(name = "status_users", joinColumns = @JoinColumn(name = "status_id"))
    @Column(name = "user_id")
    private List<String> users = new ArrayList<>();

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}
