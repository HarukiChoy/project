package com.example.be.controller;

import com.example.be.dto.LoginDTO;
import com.example.be.dto.RegisterDTO;
import com.example.be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(path = "users")
public class UserController {

  public final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  // Register POST api
  @CrossOrigin(origins = "*")
  @PostMapping("/register")
  public HashMap<String, String> addUser(@RequestBody RegisterDTO user) throws Exception {
    return userService.addUser(user);
  }

  @CrossOrigin(origins = "*")
  @PostMapping("/login")
  public HashMap<String, String> login(@RequestBody LoginDTO user) throws Exception {
    return userService.login(user);
  }


//  @CrossOrigin(origins = "*")
//  @GetMapping("/profile")
//  public String getProfileByUserId(
//    @RequestParam("email") String id,
//    @RequestParam("password") String type
//  ) {
//    return "{id:" + id + ",type:" + type + "}";
//  }


}
