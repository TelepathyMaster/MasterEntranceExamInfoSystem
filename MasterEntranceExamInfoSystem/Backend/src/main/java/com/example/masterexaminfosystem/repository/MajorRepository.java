package com.example.masterexaminfosystem.repository;

import com.example.masterexaminfosystem.pojo.entity.Major;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MajorRepository extends JpaRepository<Major, Long> {
    List<Major> findFirst100ByOrderByIdAsc();

    @Query(value= """
            SELECT
            *
            FROM
            major
            WHERE
            major LIKE CONCAT('%',?1,'%')
            AND( category = ?2  or ?2='' or ?2='全部')
            AND (first_level_discipline = ?3 or ?3='' or ?3='全部')
            and (?6='true' and university_feature!='其他' or ?6!='true' and (university_feature=?4 or ?4='' or ?4='全部'))
            and (study_mode=?5 or ?5='' or ?5='全部')
            limit 100
            """, nativeQuery= true)
    List<Major> findMajor(String name, String category, String discipline, String feature, String studyMode, String doubleFirstClass);
}