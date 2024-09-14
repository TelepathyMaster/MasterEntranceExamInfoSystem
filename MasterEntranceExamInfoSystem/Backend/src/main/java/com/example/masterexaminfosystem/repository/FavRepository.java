package com.example.masterexaminfosystem.repository;

import com.example.masterexaminfosystem.pojo.entity.Fav;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavRepository extends JpaRepository<Fav, Long>{
    List<Fav> findByItemIdAndUserIdAndType(Long itemid, Long userId, String type);
    List<Fav> findByUserIdAndType(Long userId, String type);

    @Query("SELECT DISTINCT f.userId FROM Fav f where f.type=?1")
    List<Long> findDistinctUserIdByType(String type);
}
