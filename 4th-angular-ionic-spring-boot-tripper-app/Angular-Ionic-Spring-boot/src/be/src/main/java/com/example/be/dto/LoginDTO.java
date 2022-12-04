package com.example.be.dto;

import java.io.Serializable;

public class LoginDTO implements Serializable {
  public String email;
  public String password;

  public LoginDTO(String email, String password) {
    this.email = email;
    this.password = password;
  }
}
