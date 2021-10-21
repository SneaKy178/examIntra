package com.intra.controller;

import com.intra.model.User;
import com.intra.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(path = "/user/addUser")
    public User addUser(@RequestBody User student) {
        return userService.addUser(student);
    }

    @GetMapping(path = "/user/getUsers")
    public List<User> getUsers() {
        return userService.getUsers();
    }

}
