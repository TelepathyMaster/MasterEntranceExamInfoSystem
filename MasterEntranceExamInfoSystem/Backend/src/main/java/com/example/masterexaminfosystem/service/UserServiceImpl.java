package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.User;
import com.example.masterexaminfosystem.repository.UserRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Resource
    private UserRepository userRepository;
    @Override
    public User insertUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> authUser(User user) {
        return userRepository.findUsersByUsernameAndPassword(user.getUsername(),user.getPassword());
    }
}
