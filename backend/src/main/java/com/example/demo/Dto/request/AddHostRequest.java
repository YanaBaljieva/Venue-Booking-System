package com.example.demo.Dto.request;

import com.example.demo.models.User;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDate;


public class AddHostRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String city;
    @NotBlank
    private String country;
    @NotBlank
    private String address;
    @NotBlank
    private String price;

    //add photos
    @NotBlank
    private LocalDate date; // updated can be put, or approved date
    @NotBlank
    private String description;
    @DBRef
    private String user_id;


    public AddHostRequest(String name, String city, String country, String address, String price, String description/*, String user_id*/) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.address = address;
        this.price = price;
        this.date = LocalDate.now();
        this.description = description;
        //  this.user_id = user_id;
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
