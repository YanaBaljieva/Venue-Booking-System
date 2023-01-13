package com.example.demo.controllers;

import com.example.demo.model.User;
import com.example.demo.services.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserServiceImpl userRepoService;

    @PostMapping("/add")
    public void saveUser(@RequestBody User user){
        userRepoService.save(user);
    }

    @GetMapping("/all")
    public List<User> getUsers() {

        return userRepoService.getUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) throws Exception {

        User user = userRepoService.findViaId(id)
                .orElseThrow(() -> new Exception("User not exist with id :" + id));;
        return ResponseEntity.ok(user);
    }

    @PutMapping("/users/{id}")
    public User update(@PathVariable String id, @RequestBody User user){
        Optional<User> optcontact = userRepoService.findViaId(id);
        User u = optcontact.get();
        if (user.getFirst_name() != null)
            u.setFirst_name(user.getFirst_name());
        if(user.getLast_name() != null){
            u.setLast_name(user.getLast_name());
        }
        if(user.getEmail() != null){
            u.setEmail(user.getEmail());
        }
        if(user.getPassword() != null){
            u.setPassword(user.getPassword());
        }
        if(user.getPhone() != null){
            u.setPhone(user.getPhone());
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
