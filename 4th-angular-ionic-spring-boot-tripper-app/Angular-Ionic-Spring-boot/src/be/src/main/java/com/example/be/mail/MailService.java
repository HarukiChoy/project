//package com.example.be.mail;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.MailException;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.mail.javamail.MimeMessagePreparator;
//import org.springframework.stereotype.Service;
//
//@Service
//public class MailService {
//
//  private JavaMailSender mailSender;
//
//  @Autowired
//  public MailService(JavaMailSender mailSender) {
//    this.mailSender = mailSender;
//  }
//
//  public void prepareAndSend(String recipient, String message){
//    MimeMessagePreparator messagePreparator = mimeMessage -> {
//      MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
//      messageHelper.setFrom("harukichoy0511@gmail.com");
//      messageHelper.setTo(recipient);
//      messageHelper.setSubject(message);
//      messageHelper.setText(message);
//    };
//
//    try {
//      mailSender.send(messagePreparator);
//      System.out.println("sent.");
//    } catch (MailException e ){
//      System.out.println(e.getMessage());
//    }
//  }
//}
