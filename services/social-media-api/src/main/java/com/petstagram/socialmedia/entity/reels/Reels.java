package com.petstagram.socialmedia.entity.reels;

import com.petstagram.socialmedia.entity.base.BaseEntity;
import jakarta.persistence.Entity;

import java.util.UUID;

@Entity
public class Reels extends BaseEntity {
    private String userName;
    private String url;
    private String caption;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }
}
