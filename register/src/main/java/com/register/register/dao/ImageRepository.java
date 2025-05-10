package com.register.register.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.register.register.models.Image;

@Repository

public interface ImageRepository extends JpaRepository<Image, Long> {

}
