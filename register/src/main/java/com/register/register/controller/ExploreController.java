package com.register.register.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.register.register.dto.ExploreDTO;
import com.register.register.service.ExploreService;

@RestController
@RequestMapping("/explore")
@CrossOrigin(origins = "http://localhost:5174")
public class ExploreController {

    @Autowired
    private ExploreService exploreService;

    @PostMapping("/save")
    public String saveExplore(@RequestParam("file") MultipartFile file,
                              @RequestParam("description") String description,
                              @RequestParam("startTime") String startTime,
                              @RequestParam("startDate") String startDateStr,
                              @RequestParam("startYear") int startYear,
                              @RequestParam("registrationLastTime") String registrationLastTime,
                              @RequestParam("registrationLastDate") String registrationLastDateStr,
                              @RequestParam("registrationLastYear") int registrationLastYear,
                              @RequestParam("username") String username) throws IOException {

        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate registrationLastDate = LocalDate.parse(registrationLastDateStr);

        return exploreService.saveExplore(file, description, startTime, startDate, startYear,
                                          registrationLastTime, registrationLastDate, registrationLastYear, username);
    }

    @GetMapping("/")
    public String sayHello() {
        return "Welcome to the Explore section!";
    }

    @GetMapping("/fetch")
    public List<ExploreDTO> fetchExplores() {
        return exploreService.fetchExplores();
    }
}
