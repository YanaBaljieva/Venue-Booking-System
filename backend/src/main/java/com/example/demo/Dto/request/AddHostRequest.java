package com.example.demo.Dto.request;
import jakarta.validation.constraints.NotBlank;


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
    @NotBlank
    private String description;


    public AddHostRequest(String name, String city, String country, String address, String price, String description) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.address = address;
        this.price = price;
        this.description = description;
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

}
