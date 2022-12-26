package com.example.be.controller;
import com.example.be.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping(path="auth")
@CrossOrigin(origins="*")
public class Auth {

  public final JwtService jwtService;

  @Autowired
  public Auth(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @GetMapping("/check")
  public static HashMap<String, Integer> checkJwtValid(HttpServletRequest req) throws Exception{
    String authorHeader = req.getHeader("Authorization");
    String bearer = "Bearer ";
    String token = authorHeader.substring(bearer.length());
    String userId = JwtService.parseJWT(token);
    Integer id = Integer.parseInt(userId);
    HashMap<String, Integer> map = new HashMap<>();
    map.put("userId", id);
    return map;
  }
}
