package com.example.masterexaminfosystem.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "major")
public class Major {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "university")
    private String university;

    @Column(name = "university_feature")
    private String universityFeature;

    @Column(name = "faculty")
    private String faculty;

    @Column(name = "major")
    private String major;

    @Column(name = "research_field")
    private String researchField;

    @Column(name = "study_mode")
    private String studyMode;

    @Column(name = "admission_target")
    private String admissionTarget;

    @Column(name = "remark")
    private String remark;

    @Column(name = "course_one")
    private String courseOne;

    @Column(name = "course_two")
    private String courseTwo;

    @Column(name = "foreign_language")
    private String foreignLanguage;

    @Column(name = "politics")
    private String politics;

    @Column(name = "province")
    private String province;

    @Column(name = "tutor")
    private String tutor;

    @Column(name = "accept_special_program")
    private String acceptSpecialProgram;

    @Column(name = "major_code")
    private String majorCode;

    @Column(name = "category")
    private String category;

    @Column(name = "first_level_discipline")
    private String firstLevelDiscipline;

    
}