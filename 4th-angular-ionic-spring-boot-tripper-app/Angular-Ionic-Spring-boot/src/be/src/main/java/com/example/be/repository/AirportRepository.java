package com.example.be.repository;

import com.example.be.dto.AirportDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  AirportRepository extends JpaRepository<AirportDAO, Long> {
}
