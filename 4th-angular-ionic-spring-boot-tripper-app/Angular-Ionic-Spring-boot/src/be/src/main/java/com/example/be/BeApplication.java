package com.example.be;
import com.example.be.dto.LoginDTO;
import com.example.be.security.JwtService;
import io.jsonwebtoken.Claims;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.util.HashMap;

@SpringBootApplication
public class BeApplication {

  public static void main(String[] args) throws Exception {

    SpringApplication.run(BeApplication.class, args);

//    HashMap<String, String> token = JwtService.createJwt(
//      new LoginDTO("harukichoy0511@gmail.com"
//        , "12345678")
//      , 1L);
//    System.out.println("Token generated is: " + token);
//    String jwt = token.get("jwtToken");
//    System.out.println("jwt : " + jwt);
//    try {
//      Claims claims = JwtService.parseJWT(jwt);
//      System.out.println("claims : " + claims);
//      System.out.println("Parsing done : " + claims.getId());
//
//    } catch (Exception e) {
//      throw new Exception(e.getMessage());
//    }
  }
}
