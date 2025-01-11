package com.petstagram.socialmedia.entity.story;

import com.petstagram.socialmedia.entity.base.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Story extends BaseEntity {
    private UUID userId;
}
