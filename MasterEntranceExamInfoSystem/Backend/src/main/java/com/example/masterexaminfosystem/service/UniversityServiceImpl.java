package com.example.masterexaminfosystem.service;

import com.example.masterexaminfosystem.pojo.entity.Fav;
import com.example.masterexaminfosystem.pojo.entity.University;
import com.example.masterexaminfosystem.repository.UniversityRepository;
import jakarta.annotation.Resource;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service

public class UniversityServiceImpl implements UniversityService {
    @Resource
    private UniversityRepository universityRepository;

    @Override
    public University insertUniversity(University university) {
        return universityRepository.save(university);
    }

    @Override
    public void deleteUniversity(Long id) {
        universityRepository.deleteById(id);
    }

    @Override
    public University updateUniversity(University university) {
        return universityRepository.save(university);
    }

    @Override
    public List<University> findAllUniversity() {
        return universityRepository.findAll();
    }

    @Override
    public University findUniversityById(Long id) {
        return universityRepository.findById(id).orElse(null);
    }

    @Resource
    FavService favService;

    @Override
    public List<University> findRecommendation(Long uid) {
        List<Long> users = favService.findDistinctUserIdByType("university");
        List<Long> recommendationList = new ArrayList<>();
        if (!users.contains(uid))
            recommendationList.add(14L);
        else {
            Map<Long, List<Long>> favMap = new HashMap<>();
            for (Long user : users) {
                favMap.put(user, favService.findByUserIdAndType(user, "university").stream().map(
                        Fav::getItemId).collect(Collectors.toList()));
            }
            users.sort(new Comparator<Long>() {
                @Override
                public int compare(Long o1, Long o2) {
                    int interSet1 = CollectionUtils.intersection(favMap.get(uid), favMap.get(o1)).size();
                    int interSet2 = CollectionUtils.intersection(favMap.get(uid), favMap.get(o2)).size();
                    int unionSet1 = CollectionUtils.union(favMap.get(uid), favMap.get(o1)).size();
                    int unionSet2 = CollectionUtils.union(favMap.get(uid), favMap.get(o2)).size();
                    double distance1 = 1 - (double) interSet1 / unionSet1;
                    double distance2 = 1 - (double) interSet2 / unionSet2;
                    if (distance1 > distance2) {
                        return 1;
                    } else if (distance1 < distance2) {
                        return -1;
                    }
                    return 0;
                }
            });
            users.remove(uid);

            int k = 3; //取k相邻个用户的收藏夹
            //利用TreeSet去重
            for (int i = 0; i < k; i++) {
                recommendationList.addAll(favMap.get(users.get(i)));
            }
            Set<Long> recommendationSet = new TreeSet<>(recommendationList);
            recommendationList.clear();
            recommendationList.addAll(recommendationSet);

            favMap.get(uid).forEach(recommendationList::remove); //去除该用户已收藏的项目
            // 根据出现次数对recommendationList进行排序
            recommendationList.sort(new Comparator<Long>() {
                @Override
                public int compare(Long o1, Long o2) {
                    int count1 = 0, count2 = 0;
                    for (int i = 0; i < k; i++) {
                        if (favMap.get(users.get(i)).contains(o1))
                            count1++;
                        if (favMap.get(users.get(i)).contains(o2))
                            count2++;
                    }
                    return count2 - count1;
                }
            });
        }
//        System.out.println(recommendationList);
        List<University> results = new ArrayList<>(); //返回对应的项目数据
        for (int i = 0; i < Math.min(3, recommendationList.size()); i++) {
            results.add(findUniversityById(recommendationList.get(i)));
        }
        return results;
    }

    @Override
    public List<University> getFavs(Long uid) {
        return universityRepository.getFavs(uid);
    }

    @Override
    public List<University> findByCondition(String name, String type, String province, String affiliation, String feature) {
        if (feature != null && feature.equals("双一流"))
            return universityRepository.findByCondtionAndDualClass(name, type, province, affiliation);
        else return universityRepository.findByCondtion(name, type, province, affiliation, feature);
    }
}