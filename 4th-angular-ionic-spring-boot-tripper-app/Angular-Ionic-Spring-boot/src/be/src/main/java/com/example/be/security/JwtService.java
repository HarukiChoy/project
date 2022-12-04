package com.example.be.security;

import com.example.be.dto.LoginDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;

@Service
public class JwtService {
  private static final String secretKey = "ngo1dou2ng3zhi4dou5gor6secret7hai8d9meh0";
  public static SecretKey generateKey() {
    byte[] encodeKey = Base64.getDecoder().decode(secretKey);
    SecretKey key = new SecretKeySpec(encodeKey, 0, encodeKey.length, "AES");
    return key;
  }
  public static SecretKey secret = generateKey();
  public static HashMap<String, String> createJwt(LoginDTO user, Long userId) {
    // jwt issued at now
    Date now = new Date();
    // jwt expired after 30 minutes
    Date expireDate = new Date(System.currentTimeMillis() + 3 * 60 * 1000);
    // generate the token
    JwtBuilder builder = Jwts.builder()
      // set the header in jwt
      .setHeaderParam("alg", "HS512")
      .setHeaderParam("typ", "JWT")
      // set the claims in payload
      // add user id inside the claims -> jti
      .setId(userId.toString())
      // add user email inside the claims -> sub
      .setSubject(user.email)
      // add issue time -> iat
      .setIssuedAt(now)
      // add expired time of the token -> exp
      .setExpiration(expireDate)
      // add who issue the token -> iss
      .setIssuer("haruki")
      // generate the signature
      .signWith(SignatureAlgorithm.HS512, secret);

    String jwtToken = builder.compact();
    HashMap<String, String> map = new HashMap<>();
    map.put("jwtToken", jwtToken);
    return map;
  }

  public static Claims parseJWT(String jwtToken) throws Exception {
    try{
      return Jwts.parser()
        .setSigningKey(secret)
        .parseClaimsJws(jwtToken)
        .getBody();
    }catch(Exception e){
      throw new Exception(e.getMessage());
    }

  }
}
