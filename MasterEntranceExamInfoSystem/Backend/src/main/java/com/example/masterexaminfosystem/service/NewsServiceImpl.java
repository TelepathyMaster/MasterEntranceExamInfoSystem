package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.News;
import com.example.masterexaminfosystem.repository.NewsRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class NewsServiceImpl implements NewsService{
    @Resource
    private NewsRepository newsRepository;

    @Override
    public News insertNews(News news) {
        return newsRepository.save(news);
    }

    @Override
    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }

    @Override
    public News updateNews(News news) {
        return newsRepository.save(news);
    }

    @Override
    public List<News> findAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public News findNewsById(Long id) {
        return newsRepository.findById(id).orElse(null);
    }
}