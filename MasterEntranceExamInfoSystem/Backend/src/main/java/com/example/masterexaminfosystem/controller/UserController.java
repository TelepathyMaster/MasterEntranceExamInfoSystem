package com.example.masterexaminfosystem.controller;

import com.example.masterexaminfosystem.pojo.entity.User;
import com.example.masterexaminfosystem.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Resource
    UserService userService;

    @GetMapping("")
    public List<User> findAll() {
        return userService.findAllUser();
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable("id") Long id) {
        return userService.findUserById(id);
    }

    @PostMapping("/auth")
    public List<User> authUser(@RequestBody User user) {
        return userService.authUser(user);
    }

    @PostMapping("")
    public User addUser(@RequestBody User user) {
        return userService.insertUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

}
