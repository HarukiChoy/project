package com.example.be.repository;

import com.example.be.dto.PrepareListDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrepareListRepository extends JpaRepository<PrepareListDAO,Long> {
  @Query(value="select * from prepare p where p.user_id = ?1", nativeQuery = true)
  List<PrepareListDAO> findAllByUserId(Integer userId);
}
