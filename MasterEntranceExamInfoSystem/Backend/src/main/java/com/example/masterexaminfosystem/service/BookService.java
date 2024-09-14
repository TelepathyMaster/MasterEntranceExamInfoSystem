package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.Book;
import java.util.List;
public interface BookService {
    Book insertBook(Book book);

    void deleteBook(Long id);

    Book updateBook(Book book);

    List <Book> findAllBook();

    Book findBookById(Long id);

    List<Book> getFavs(Long uid);

    List<Book> findRecommendation(Long uid);

    List<Book> findByCondition(String name, String category);
}