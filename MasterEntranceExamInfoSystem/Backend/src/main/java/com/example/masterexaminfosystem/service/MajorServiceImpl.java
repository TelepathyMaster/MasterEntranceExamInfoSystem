package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.Major;
import com.example.masterexaminfosystem.repository.MajorRepository;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class MajorServiceImpl implements MajorService{
    @Resource
    private MajorRepository majorRepository;

    @Override
    public Major insertMajor(Major major) {
        return majorRepository.save(major);
    }

    @Override
    public void deleteMajor(Long id) {
        majorRepository.deleteById(id);
    }

    @Override
    public Major updateMajor(Major major) {
        return majorRepository.save(major);
    }

    @Override
    public List<Major> findAllMajor() {
        return majorRepository.findFirst100ByOrderByIdAsc();
    }

    @Override
    public Major findMajorById(Long id) {
        return majorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Major> findMajor(String name, String category, String discipline, String feature, String studyMode, String doubleFirstClass) {
        return majorRepository.findMajor(name, category, discipline, feature, studyMode, doubleFirstClass);
    }
}