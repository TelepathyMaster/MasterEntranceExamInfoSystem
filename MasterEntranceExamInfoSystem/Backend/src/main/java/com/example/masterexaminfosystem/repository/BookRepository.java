package com.example.masterexaminfosystem.repository;

import com.example.masterexaminfosystem.pojo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value = "select book.* from book, fav where fav.item_id=book.id and fav.user_id=?1 and fav.type='book' order by book.id", nativeQuery = true)
    List<Book> getFavs(Long uid);

    @Query(value= """
            SELECT
            *
            FROM
            book
            WHERE
            name LIKE CONCAT('%',?1,'%')
            AND( category = ?2  or ?2='' or ?2='全部')
            """, nativeQuery= true)
    List<Book> findByCondition(String name, String category);

}