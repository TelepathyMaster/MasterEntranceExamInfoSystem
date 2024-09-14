package com.example.masterexaminfosystem.repository;

import com.example.masterexaminfosystem.pojo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findUsersByUsernameAndPassword(String username, String password);
}
