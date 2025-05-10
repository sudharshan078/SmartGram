package com.register.register.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.register.register.models.Explore;


@Repository
public interface ExploreRepository extends JpaRepository<Explore, Long>{

}
