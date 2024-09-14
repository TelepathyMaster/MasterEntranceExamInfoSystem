package com.example.masterexaminfosystem.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "news")
public class News {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "timestamp")
    private String timestamp;

    
}