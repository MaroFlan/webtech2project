package de.ls5.wt2.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@Entity
public class DBNews extends DBIdentified {

   //private Date publishedOn;
    private String publishedOn;
    private String headline;
    private String content;
    private long UserId;
    private long id;
    private String username;

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

//    @Temporal(TemporalType.TIMESTAMP)
//    @DateTimeFormat(iso = ISO.DATE_TIME)
    public String getPublishedOn() {
        return publishedOn;
    }

    public void setPublishedOn(String publishedOn) {
        this.publishedOn = publishedOn;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getUserId() {
        return UserId;
    }

    public void setUserId(long userId) {
        UserId = userId;
    }


}

