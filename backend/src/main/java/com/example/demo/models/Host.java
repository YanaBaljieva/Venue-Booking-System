package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.*;
import java.util.*;

@Document(collection = "hosts")
public class Host {
    @Id
    private String id;

    private String name;
    private String city;
    private String country;
    private String address;
    private String price;

    private List<Review> reviews;
    private List<LocalDate> booked_at;
    //add photos
    private Date date; // updated can be put, or approved date

    private String description;
    private String username;


    public Host(String name, String city, String country, String address, String price, String description, String username) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.address = address;
        this.price = price;
        this.reviews = new ArrayList<>();
        this.date = new Date();
        this.description = description;
        this.booked_at = new ArrayList<>();
        this.username = username;
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

    public Date getDate_created() {
        return date;
    }

    public void setDate_created(Date date) {
        this.date = date;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<LocalDate> getBooked_at() {
        return booked_at;
    }

    public void setBooked_at(List<LocalDate> booked_at) {
        this.booked_at = booked_at;
    }
}
