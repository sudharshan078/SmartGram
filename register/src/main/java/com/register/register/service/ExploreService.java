package com.register.register.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.register.register.dao.ExploreRepository;
import com.register.register.dto.ExploreDTO;
import com.register.register.models.Explore;

@Service
public class ExploreService {

    @Autowired
    private ExploreRepository exploreRepository;

    public String saveExplore(MultipartFile file,
                              String description,
                              String startTime,
                              LocalDate startDate,
                              int startYear,
                              String registrationLastTime,
                              LocalDate registrationLastDate,
                              int registrationLastYear,
                              String username) throws IOException {

        Explore explore = new Explore();
        explore.setDescription(description);
        explore.setImage(file.getBytes());
        explore.setStartTime(startTime);
        explore.setStartDate(startDate);
        explore.setStartYear(startYear);
        explore.setRegistrationLastTime(registrationLastTime);
        explore.setRegistrationLastDate(registrationLastDate);
        explore.setRegistrationLastYear(registrationLastYear);
        explore.setUsername(username);

        exploreRepository.save(explore);
        return "Explore data saved in DB";
    }

    public List<ExploreDTO> fetchExplores() {
        List<Explore> explores = exploreRepository.findAll();
        return explores.stream()
                .map(exp -> new ExploreDTO(
                        exp.getId(),
                        exp.getDescription(),
                        "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(exp.getImage()),
                        exp.getStartTime(),
                        exp.getStartDate(),
                        exp.getStartYear(),
                        exp.getRegistrationLastTime(),
                        exp.getRegistrationLastDate(),
                        exp.getRegistrationLastYear(),
                        exp.getUsername()
                ))
                .collect(Collectors.toList());
    }
}
