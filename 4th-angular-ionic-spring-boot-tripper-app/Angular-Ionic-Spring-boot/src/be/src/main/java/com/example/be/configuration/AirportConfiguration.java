package com.example.be.configuration;

import com.example.be.dto.AirportDAO;
import com.example.be.dto.UserDAO;
import com.example.be.repository.AirportRepository;
import com.example.be.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Configuration
public class AirportConfiguration {
  public static List<AirportDAO> readCsvFile () {
    String pwd = new File("").getAbsolutePath();
    String path = pwd + "/src/main/java/com/example/be/configuration/result.csv";
    String line = "";
    List<AirportDAO> airports = new ArrayList<>();
    BufferedReader br;
    {
      try {
        br = new BufferedReader(new FileReader(path));
        while((line = br.readLine()) != null) {
          String[] values = line.split(",");
          AirportDAO airport = new AirportDAO();
          airport.setIATA_code(values[0]);
          airport.setName(values[1]);
          airports.add(airport);
        }
        return airports;
      } catch (FileNotFoundException e) {
        throw new RuntimeException(e);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }
  }

//  @Bean
//  CommandLineRunner commandLineRunner(AirportRepository airportRepository) {
//    return args -> {
//      List<AirportDAO> airportDAOList = readCsvFile();
//      System.out.println(airportDAOList);
//      airportRepository.saveAll(airportDAOList);
//    };
//  }

  @Bean
  CommandLineRunner commandLineRunner(UserRepository userRepository, AirportRepository airportRepository){
    return args -> {
      Date date = new Date();
      String hashPassword = BCrypt.hashpw("test", BCrypt.gensalt(12));
      UserDAO haruki = new UserDAO(
        "test",
        "test",
        hashPassword,
        "12345678",
        date
      );

      userRepository.saveAll(List.of(haruki));

      List<AirportDAO> airportDAOList = readCsvFile();
      System.out.println(airportDAOList);
      airportRepository.saveAll(airportDAOList);
    };
  }
}




