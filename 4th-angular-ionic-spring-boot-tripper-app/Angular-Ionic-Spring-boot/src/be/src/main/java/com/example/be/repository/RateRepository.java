package com.example.be.repository;

import com.example.be.dto.RateDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RateRepository extends JpaRepository<RateDAO, Long> {
  @Query(value="select * from rate r where r.eng=?1", nativeQuery = true)
  List<RateDAO> findAllByEng(String eng);
}

