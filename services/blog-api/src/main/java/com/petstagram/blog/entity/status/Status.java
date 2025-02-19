package com.petstagram.blog.entity.status;

import com.petstagram.blog.entity.base.BaseEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@MappedSuperclass
public abstract class Status extends BaseEntity {
    @ElementCollection
    @Column(name = "users")
    private List<String> users = new ArrayList<>();

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }
}
