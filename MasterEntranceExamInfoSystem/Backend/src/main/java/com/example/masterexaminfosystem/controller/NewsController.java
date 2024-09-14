package com.example.masterexaminfosystem.controller;

import com.example.masterexaminfosystem.pojo.entity.News;
import com.example.masterexaminfosystem.service.NewsService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {
    @Resource
    NewsService newsService;

    @GetMapping("")
    public List<News> findAll() {
        return newsService.findAllNews();
    }

    @GetMapping("/{id}")
    public News findById(@PathVariable("id") Long id) {
        return newsService.findNewsById(id);
    }

    @PostMapping("")
    public News addNews(@RequestBody News News) {
        return newsService.insertNews(News);
    }

    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable("id") Long id) {
        newsService.deleteNews(id);
    }

    @PutMapping("")
    public News updateNews(@RequestBody News News) {
        return newsService.updateNews(News);
    }

}