package com.arpitha.fundo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("notes")
public class Notes {
    @Id
    private String id;

    private String userId;

    private String title;
    private String description;
    private String color;
    private List<User> collaberators;
    private Boolean isArchived;
    private Boolean isDeleted;

    public Notes(String userId, String title, String description, String color, List<User> collaberators, Boolean isArchived, Boolean isDeleted) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.color = color;
        this.collaberators = collaberators;
        this.isArchived = isArchived;
        this.isDeleted = isDeleted;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<User> getCollaberators() {
        return collaberators;
    }

    public void setCollaberators(List<User> collaberators) {
        this.collaberators = collaberators;
    }

    public Boolean getArchived() {
        return isArchived;
    }

    public void setArchived(Boolean archived) {
        this.isArchived = archived;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        this.isDeleted = deleted;
    }
}
