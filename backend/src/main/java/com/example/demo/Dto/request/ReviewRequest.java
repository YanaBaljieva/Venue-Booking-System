package com.example.demo.Dto.request;

public class ReviewRequest {
    private int stars;
    private String comment;

    private String host_id;

    public ReviewRequest(String host_id, int stars, String comment) {
        this.host_id = host_id;
        this.stars = stars;
        this.comment = comment;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getHost_id() {
        return host_id;
    }

    public void setHost_id(String host_id) {
        this.host_id = host_id;
    }
}
