package com.example.masterexaminfosystem.repository;

import com.example.masterexaminfosystem.pojo.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}