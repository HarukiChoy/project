package com.example.be.repository;

import com.example.be.dto.TripDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface TripRepository extends JpaRepository<TripDAO, Long> {

  TripDAO findTripDAOSById(Long tripId);
  Optional<TripDAO> findById(Long tripId);
}

