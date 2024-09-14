package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.Fav;
import com.example.masterexaminfosystem.pojo.entity.University;

import java.util.List;
public interface FavService {
    Fav insertFav(Fav fav);

    void deleteFav(Long id);

    Fav updateFav(Fav fav);

    List <Fav> findAllFav();

    List<Fav> findByItemidAndUserIdAndType(Long itemId, Long uid, String type);

    Fav findFavById(Long id);

    List<Long> findDistinctUserIdByType(String type);

    List<Fav> findByUserIdAndType(Long uid, String type);
}
