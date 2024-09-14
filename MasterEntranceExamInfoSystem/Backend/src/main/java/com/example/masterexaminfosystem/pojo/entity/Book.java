package com.example.masterexaminfosystem.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Book")
public class Book {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name")
    private String name;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "publishing_house")
    private String publishingHouse;

    @Column(name = "writer")
    private String writer;

    @Column(name = "publication_date")
    private String publicationDate;

    @Column(name = "picture_link")
    private String pictureLink;

    @Column(name = "content")
    private String content;

}