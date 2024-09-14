package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.Major;
import java.util.List;
public interface MajorService {
    Major insertMajor(Major major);

    void deleteMajor(Long id);

    Major updateMajor(Major major);

    List <Major> findAllMajor();

    Major findMajorById(Long id);

    List<Major> findMajor(String name, String category, String discipline, String feature, String studyMode, String doubleFirstClass);
}