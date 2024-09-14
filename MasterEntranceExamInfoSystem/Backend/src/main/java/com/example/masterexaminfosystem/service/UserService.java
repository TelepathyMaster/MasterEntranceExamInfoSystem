package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.User;

import java.util.List;

public interface UserService {
    User insertUser(User user);

    void deleteUser(Long id);

    User updateUser(User user);

    List<User> findAllUser();

    User findUserById(Long id);

    List<User> authUser(User user);
}
