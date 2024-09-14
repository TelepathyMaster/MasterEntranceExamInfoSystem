package com.example.masterexaminfosystem.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "fav")
public class Fav {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "type")
    private String type;

}