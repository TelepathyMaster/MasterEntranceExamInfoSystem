package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.University;
import java.util.List;
public interface UniversityService {
    University insertUniversity(University university);

    void deleteUniversity(Long id);

    University updateUniversity(University university);

    List <University> findAllUniversity();

    University findUniversityById(Long id);

    List<University> findRecommendation(Long userId);

    List<University> getFavs(Long uid);

    List<University> findByCondition(String name, String type,String province,String affiliation, String feature);
}