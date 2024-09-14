package com.example.masterexaminfosystem.repository;

import com.example.masterexaminfosystem.pojo.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UniversityRepository extends JpaRepository<University, Long> {
    @Query(value = "select university.* from university, fav where fav.item_id=university.id and fav.user_id=?1 and fav.type='university' order by university.id", nativeQuery = true)
    List<University> getFavs(Long uid);

    @Query(value= """
            SELECT
            *
            FROM
            university
            WHERE
            NAME LIKE CONCAT('%',?1,'%')
            AND( type_name = ?2 or ?2='' or ?2='全部')
            AND (province_name = ?3 or ?3='' or ?3='全部')
            AND (affiliation = ?4 or ?4='' or ?4='全部')
            and (feature=?5 or ?5='' or ?5='全部')
            """, nativeQuery= true)
    List<University> findByCondtion(String name, String type,String province,String affiliation, String feature);

    @Query(value= """
            SELECT
            *
            FROM
            university
            WHERE
            NAME LIKE CONCAT('%',?1,'%')
            AND( type_name = ?2 or ?2='' or ?2='全部')
            AND (province_name = ?3 or ?3='' or ?3='全部')
            AND (affiliation = ?4 or ?4='' or ?4='全部')
            and dual_class_name='双一流'
            """, nativeQuery= true)
    List<University> findByCondtionAndDualClass(String name, String type,String province,String affiliation);
}