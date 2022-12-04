package com.example.be.repository;

import com.example.be.dto.UserDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDAO, Long> {
//  @Query(value = "select * from table t where id = $1", nativeQuery = true)
  List<UserDAO> findUserDAOByEmail(String email);

  Optional<UserDAO> findByEmail(String email);
}
