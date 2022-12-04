//package com.example.be.configuration;
//
//import com.example.be.dto.UserDAO;
//import com.example.be.repository.UserRepository;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.Date;
//import java.util.List;
//
//@Configuration
//public class UserConfiguration {
//
//  @Bean
//  CommandLineRunner commandLineRunner(UserRepository userRepository){
//    return args -> {
//      Date date = new Date();
//      UserDAO haruki = new UserDAO(
//        "test",
//        "test",
//        "test",
//        "12345678",
//        date
//      );
//
//      userRepository.saveAll(List.of(haruki));
//    };
//  }
//}
