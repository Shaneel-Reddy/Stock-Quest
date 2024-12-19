package com.stockquest.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtProvider {

    // Using the static key for signing and verifying the token
    static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    // Method to generate the JWT token from authentication object
    public static String generateToken(Authentication auth) {
        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000)) // 1 day expiration
                .claim("email", auth.getName()) // Storing email in token claims
                .signWith(key)
                .compact();
    }

    public static String getEmailFromToken(String jwt) {
		jwt=jwt.substring(7);
		
		Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		String email=String.valueOf(claims.get("email"));
		
		return email;
	}
}
