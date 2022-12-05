package com.example.be.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfiguration {
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .cors().and().csrf().disable()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()
      .authorizeRequests()
      .antMatchers("/users/login").permitAll()
      .antMatchers("/users/register").permitAll()
      .and()
      .addFilterAfter(new AuthorizationCheckFilter(), BasicAuthenticationFilter.class)
      .httpBasic().disable()
//      .anyRequest().authenticated()
    ;

    return http.build();
  }
}
