package com.example.masterexaminfosystem.controller;

import com.example.masterexaminfosystem.pojo.entity.Major;
import com.example.masterexaminfosystem.service.MajorService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/major")
public class MajorController {
    @Resource
    MajorService majorService;

    @GetMapping("")
    public List<Major> findAll() {
        return majorService.findAllMajor();
    }

    @GetMapping("/filter")
    public List<Major> findMajor(@RequestParam(value = "name") String name,
                                 @RequestParam(value = "category") String category,
                                 @RequestParam(value = "discipline") String discipline,
                                 @RequestParam(value = "feature") String feature,
                                 @RequestParam(value = "studyMode") String studyMode,
                                 @RequestParam(value = "doubleFirstClass") String doubleFirstClass) {
        return majorService.findMajor(name, category, discipline, feature,studyMode,doubleFirstClass);
    }

    @GetMapping("/{id}")
    public Major findById(@PathVariable("id") Long id) {
        return majorService.findMajorById(id);
    }

    @PostMapping("")
    public Major addMajor(@RequestBody Major Major) {
        return majorService.insertMajor(Major);
    }

    @DeleteMapping("/{id}")
    public void deleteMajor(@PathVariable("id") Long id) {
        majorService.deleteMajor(id);
    }

    @PutMapping("")
    public Major updateMajor(@RequestBody Major Major) {
        return majorService.updateMajor(Major);
    }

}