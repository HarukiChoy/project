package com.example.be.controller;
import com.example.be.security.JwtService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping(path="/auth")
public class Auth {

  public final JwtService jwtService;

  @Autowired
  public Auth(JwtService jwtService) {
    this.jwtService = jwtService;
  }

  @CrossOrigin(origins="*")
  @GetMapping("/check")
  public HashMap<String, String> checkJwtExpiredTime(HttpServletRequest req) throws Exception{
    String authorHeader = req.getHeader("Authorization");
    String bearer = "Bearer ";
    String token = authorHeader.substring(bearer.length());
    JwtService.parseJWT(token);
    HashMap<String, String> map = new HashMap<>();
    map.put("progress", "Success!");
    return map;
  }
}
