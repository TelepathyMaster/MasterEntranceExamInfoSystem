package com.example.masterexaminfosystem.controller;

import com.example.masterexaminfosystem.pojo.entity.Fav;
import com.example.masterexaminfosystem.pojo.entity.University;
import com.example.masterexaminfosystem.service.FavService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fav")
public class FavController {
    @Resource
    FavService favService;

    @GetMapping("")
    public List<Fav> findAll() {
        return favService.findAllFav();
    }

    @GetMapping("/existItem/{type}/{uid}/{itemid}")
    public List<Fav> existItem(@PathVariable String type, @PathVariable Long uid, @PathVariable Long itemid) {
        return favService.findByItemidAndUserIdAndType(itemid, uid, type);
    }


    @GetMapping("/findFavs/{type}/{uid}")
    public List<Fav> findByUserIdAndType(@PathVariable Long uid, @PathVariable String type){
        return favService.findByUserIdAndType(uid,type);
    }


    @GetMapping("/{id}")
    public Fav findById(@PathVariable("id") Long id) {
        return favService.findFavById(id);
    }

    @PostMapping("")
    public Fav addFav(@RequestBody Fav fav) {
        return favService.insertFav(fav);
    }

    @DeleteMapping("/{id}")
    public void deleteFav(@PathVariable("id") Long id) {
        favService.deleteFav(id);
    }

    @PutMapping("")
    public Fav updateFav(@RequestBody Fav Fav) {
        return favService.updateFav(Fav);
    }

}