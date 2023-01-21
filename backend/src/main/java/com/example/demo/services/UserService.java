package com.example.demo.services;

import com.example.demo.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void save(User user);
    List<User> getUsers();
    Optional<User> findViaId(String id);
    void deleteById(String id);
}
