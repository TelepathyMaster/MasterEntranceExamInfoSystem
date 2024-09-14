package com.example.masterexaminfosystem.pojo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "university")
public class University {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "school_code")
    private String schoolCode;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private Long type;

    @Column(name = "type_name")
    private String typeName;

    @Column(name = "school_type")
    private Long schoolType;

    @Column(name = "school_type_name")
    private String schoolTypeName;

    @Column(name = "school_nature")
    private Long schoolNature;

    @Column(name = "school_nature_name")
    private String schoolNatureName;

    @Column(name = "belong")
    private String belong;


    @Column(name = "num_subject")
    private Long numSubject;

    @Column(name = "num_master")
    private Long numMaster;

    @Column(name = "num_doctor")
    private Long numDoctor;

    @Column(name = "num_academician")
    private Long numAcademician;

    @Column(name = "num_library")
    private String numLibrary;

    @Column(name = "num_lab")
    private Long numLab;

    @Column(name = "province_id")
    private Long provinceId;

    @Column(name = "province_name")
    private String provinceName;

    @Column(name = "city_id")
    private Long cityId;

    @Column(name = "city_name")
    private String cityName;

    @Column(name = "county_id")
    private Long countyId;

    @Column(name = "town_name")
    private String townName;

    @Column(name = "create_date")
    private Long createDate;

    @Column(name = "area")
    private Double area;

    @Column(name = "old_name")
    private String oldName;

    @Column(name = "short")
    private String abbr;

    @Column(name = "ruanke_rank")
    private Long ruankeRank;

    @Column(name = "wsl_rank")
    private Long wslRank;

    @Column(name = "qs_rank")
    private Long qsRank;

    @Column(name = "xyh_rank")
    private Long xyhRank;

    @Column(name = "dual_class_name")
    private String dualClassName;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "postCode")
    private String postCode;

    @Column(name = "site")
    private String site;

    @Column(name = "school_site")
    private String schoolSite;

    @Column(name = "phone")
    private String phone;

    @Column(name = "content")
    private String content;

    @Column(name = "picture_link")
    private String pictureLink;

    @Column(name = "affiliation", length = 12)
    private String affiliation;

    @Column(name = "feature", length = 10)
    private String feature;

}