//package com.example.be.mail;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//
//@RestController
//@RequestMapping("mail")
//public class MailController {
//  private MailService mailService;
//
//  @Autowired
//  public MailController(MailService mailService) {
//    this.mailService = mailService;
//  }
//
//  @CrossOrigin
//  @GetMapping("/")
//  public String send(){
//    mailService.prepareAndSend("harukichoy0511@gmail.com", "Hello, this is a sample mail sender.");
//    return "mail sent";
//  }
//}
