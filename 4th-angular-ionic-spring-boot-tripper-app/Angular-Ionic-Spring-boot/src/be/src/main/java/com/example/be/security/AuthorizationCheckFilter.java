package com.example.be.security;
import io.jsonwebtoken.Claims;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
public class AuthorizationCheckFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Methods", "*");
    if (req.getServletPath().equals("/users/login") || req.getServletPath().equals("/users/register")  || req.getServletPath().equals("/rate/list")) {
      chain.doFilter(req, res);
      return;
    }
    String authorHeader = req.getHeader("Authorization");
    System.out.println("authorHeader: " + authorHeader);
    String bearer ="Bearer ";

    if (authorHeader == null || !authorHeader.startsWith(bearer)){
      res.setStatus(UNAUTHORIZED.value());
      return;
    }

    try {
      String token = authorHeader.substring(bearer.length());
      String id = JwtService.parseJWT(token);
      System.out.println("The user id: " + id);
      chain.doFilter(req, res);
    } catch(Exception e){
      System.err.println("Error : "+e);
      res.setStatus(FORBIDDEN.value());
    }
  }

//  @Bean
//  public FilterRegistrationBean corsFilter() {
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    CorsConfiguration config = new CorsConfiguration();
//    config.addAllowedOrigin("*");
//    config.addAllowedHeader("*");
//    config.addAllowedMethod("*");
//    source.registerCorsConfiguration("/**", config);
//    FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//    bean.setOrder(0);
//    return bean;
//  }
}
