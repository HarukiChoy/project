package com.example.be.service;

import com.example.be.dto.LoginDTO;
import com.example.be.dto.RegisterDTO;
import com.example.be.dto.UserDAO;
import com.example.be.repository.UserRepository;
import com.example.be.security.JwtService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final JwtService jwtService;

  @Autowired
  public UserService(UserRepository userRepository,
                     JwtService jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }
  public Long addUser(RegisterDTO user) {
    Optional<UserDAO> findUserByEmail = userRepository.findByEmail(user.email);
    if (findUserByEmail.isPresent()) {
      throw new IllegalStateException("This email has already been used. Please try again.");
    }

    String hashPassword = BCrypt.hashpw(user.password, BCrypt.gensalt(12));
    UserDAO newUser = new UserDAO();
    newUser.setEmail(user.email.toLowerCase());
    newUser.setUsername(user.username);
    newUser.setPassword(hashPassword);
    newUser.setMobile(user.mobile);

    Date createTimestamp = new Date();
    newUser.setCreateTimestamp(createTimestamp);
    return userRepository.save(newUser).getId();
  }

  public HashMap<String, String> login(LoginDTO user) {
    Optional<UserDAO> findUserByEmail = userRepository.findByEmail(user.email);
    if (!findUserByEmail.isPresent()) {
      throw new IllegalStateException("User not found.");
    }
    List<UserDAO> userFound = userRepository.findUserDAOByEmail(user.email);
    String hashedPassword = userFound.get(0).getPassword();
    Long userId = userFound.get(0).getId();
    Boolean checkPassword = BCrypt.checkpw(user.password, hashedPassword);
    if (!checkPassword) {
      throw new IllegalStateException("Wrong Password.");
    }
    HashMap<String, String> result = jwtService.createJwt(user, userId);
    System.out.println(result);
    return result;
  }
}
