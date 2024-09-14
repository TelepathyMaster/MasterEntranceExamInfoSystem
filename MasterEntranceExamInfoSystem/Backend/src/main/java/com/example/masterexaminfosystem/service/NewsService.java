package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.News;
import java.util.List;
public interface NewsService {
    News insertNews(News news);

    void deleteNews(Long id);

    News updateNews(News news);

    List <News> findAllNews();

    News findNewsById(Long id);
}