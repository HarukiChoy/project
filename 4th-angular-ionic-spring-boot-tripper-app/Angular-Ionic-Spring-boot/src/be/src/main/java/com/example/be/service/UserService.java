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
  public HashMap<String, String> addUser(RegisterDTO user) throws Exception {
    Optional<UserDAO> findUserByEmail = userRepository.findByEmail(user.email);
    if (findUserByEmail.isPresent()) {
      throw new Exception("This email has already been used. Please try again.");
    }

    String hashPassword = BCrypt.hashpw(user.password, BCrypt.gensalt(12));
    UserDAO newUser = new UserDAO();
    newUser.setEmail(user.email.toLowerCase());
    newUser.setUsername(user.username);
    newUser.setPassword(hashPassword);
    newUser.setMobile(user.mobile);

    Date createTimestamp = new Date();
    newUser.setCreateTimestamp(createTimestamp);
    Long userId = userRepository.save(newUser).getId();
    LoginDTO loginUser = new LoginDTO(user.email, hashPassword);
    HashMap<String, String> result = JwtService.createJwt(loginUser, userId);
    return result;
  }

  public HashMap<String, String> login(LoginDTO user) throws Exception {
    Optional<UserDAO> findUserByEmail = userRepository.findByEmail(user.email);
    if (!findUserByEmail.isPresent()) {
      throw new Exception("User not found.");
    }
    List<UserDAO> userFound = userRepository.findUserDAOByEmail(user.email);
    String hashedPassword = userFound.get(0).getPassword();
    Long userId = userFound.get(0).getId();
    Boolean checkPassword = BCrypt.checkpw(user.password, hashedPassword);
    if (!checkPassword) {
      throw new Exception("Wrong Password.");
    }
    HashMap<String, String> result = JwtService.createJwt(user, userId);
    return result;
  }
}
