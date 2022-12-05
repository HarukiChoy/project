package com.example.be.repository;

import com.example.be.dto.TripDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<TripDAO, Long> {

  TripDAO findTripDAOSByIdAndUserId(Long id, Integer userId);

  List<TripDAO> findByUserId(Integer userId);
}

