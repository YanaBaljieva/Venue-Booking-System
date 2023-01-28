package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "hosts")
public class Host {
    @Id
    private String id;

    private String name;
    private String city;
    private String country;
    private String address;
    private String price;

    @DBRef
    private List<Review> reviews = new ArrayList<>();
    //add photos
    private LocalDate date; // updated can be put, or approved date
    private String description;
    private String user_id;


    public Host(String id, String name, String city, String country, String address, String price, List<Review> reviews, LocalDate date, String description, String user_id) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.address = address;
        this.price = price;
        this.reviews = reviews;
        this.date = date;
        this.description = description;
        this.user_id = user_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public LocalDate getDate_created() {
        return date;
    }

    public void setDate_created(LocalDate date) {
        this.date = date;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }
}
