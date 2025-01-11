package com.petstagram.socialmedia.entity.status;

import com.petstagram.socialmedia.entity.base.BaseEntity;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@MappedSuperclass
@Getter @Setter
@NoArgsConstructor
public abstract class Status extends BaseEntity {
    private List<UUID> users = new ArrayList<>();
}
