package com.example.demo.controllers;

import com.example.demo.models.User;
import com.example.demo.services.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserServiceImpl userRepoService;

    @GetMapping("/all")
    public List<User> getUsers() {
        return userRepoService.getUsers();
    }

    @PutMapping("/users/{id}")
    public User update(@PathVariable String id, @RequestBody User user){
        Optional<User> optcontact = userRepoService.findViaId(id);
        User u = optcontact.get();

        if(user.getEmail() != null){
            u.setEmail(user.getEmail());
        }
        if(user.getPassword() != null){
            u.setPassword(user.getPassword());
        }
        userRepoService.save(u);
        return u;
    }

    @DeleteMapping("/delete_user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) throws Exception {
        userRepoService.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

}