package com.example.be.repository;

import com.example.be.dto.ScheduleDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleDAO, Long> {
}
