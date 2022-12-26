package com.example.be.controller;

import com.example.be.dto.LoginDTO;
import com.example.be.dto.RegisterDTO;
import com.example.be.dto.UserDAO;
import com.example.be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@RestController
@RequestMapping(path = "users")
@CrossOrigin(origins = "*")
public class UserController {

  public final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  // Register POST api

  @PostMapping("/register")
  public HashMap<String, String> addUser(@RequestBody RegisterDTO user) throws Exception {
    return userService.addUser(user);
  }

  @PostMapping("/login")
  public HashMap<String, String> login(@RequestBody LoginDTO user) throws Exception {
    return userService.login(user);
  }

  @GetMapping("/profile")
  public UserDAO profile(HttpServletRequest req) throws Exception {
    HashMap<String, Integer> map = Auth.checkJwtValid(req);
    Integer userId = map.get("userId");
    UserDAO user =  userService.getProfile(userId);
    System.out.println("user profile: " + user);
    return user;
  }


}
