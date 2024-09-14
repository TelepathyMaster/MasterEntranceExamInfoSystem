package com.example.masterexaminfosystem.controller;

import com.example.masterexaminfosystem.pojo.entity.Book;
import com.example.masterexaminfosystem.service.BookService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {
    @Resource
    BookService bookService;

    @GetMapping("")
    public List<Book> findAll() {
        return bookService.findAllBook();
    }

    @GetMapping("/filter")
    public List<Book> findByFilter(@RequestParam(value = "name") String name, @RequestParam(value = "category") String category) {
        return bookService.findByCondition(name,category);
    }

    @GetMapping("/getRecommendation/{uid}")
    public List<Book> getRecommendation(@PathVariable Long uid){
        return bookService.findRecommendation(uid);
    }

    @GetMapping("/getFavs/{uid}")
    public List<Book> getFavs(@PathVariable Long uid){
        return bookService.getFavs(uid);
    }


    @GetMapping("/{id}")
    public Book findById(@PathVariable("id") Long id) {
        return bookService.findBookById(id);
    }

    @PostMapping("")
    public Book addBook(@RequestBody Book Book) {
        return bookService.insertBook(Book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable("id") Long id) {
        bookService.deleteBook(id);
    }

    @PutMapping("")
    public Book updateBook(@RequestBody Book Book) {
        return bookService.updateBook(Book);
    }

}