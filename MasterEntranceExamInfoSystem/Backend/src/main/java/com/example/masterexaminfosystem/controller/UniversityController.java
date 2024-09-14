package com.example.masterexaminfosystem.controller;

import com.example.masterexaminfosystem.pojo.entity.University;
import com.example.masterexaminfosystem.service.UniversityService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/university")
public class UniversityController {
    @Resource
    UniversityService universityService;

    @GetMapping("")
    public List<University> findAll() {
        return universityService.findAllUniversity();
    }

    @GetMapping("/filter")
    public List<University> findByCondition(@RequestParam(value = "name") String name,
                                            @RequestParam(value = "feature") String feature,
                                            @RequestParam(value = "province") String province,
                                            @RequestParam(value = "type") String type,
                                            @RequestParam(value="affiliation") String affiliation) {
        return universityService.findByCondition(name, type,province,affiliation, feature);
    }

    @GetMapping("/{id}")
    public University findById(@PathVariable("id") Long id) {
        return universityService.findUniversityById(id);
    }


    @GetMapping("/getRecommendation/{uid}")
    public List<University> getRecommendation(@PathVariable Long uid){
        return universityService.findRecommendation(uid);
    }

    @GetMapping("/getFavs/{uid}")
    public List<University> getFavs(@PathVariable Long uid){
        return universityService.getFavs(uid);
    }

    @PostMapping("")
    public University addUniversity(@RequestBody University University) {
        return universityService.insertUniversity(University);
    }

    @DeleteMapping("/{id}")
    public void deleteUniversity(@PathVariable("id") Long id) {
        universityService.deleteUniversity(id);
    }

    @PutMapping("")
    public University updateUniversity(@RequestBody University University) {
        return universityService.updateUniversity(University);
    }

}