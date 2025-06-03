package de.dhbwravensburgwebeng.trip_planner_be.service;

import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import de.dhbwravensburgwebeng.trip_planner_be.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {

    private final UserRepository userRepository;
    private String secretkey = "";

    public JWTService(UserRepository userRepository) throws NoSuchAlgorithmException {
        KeyGenerator keygen = KeyGenerator.getInstance("HmacSHA256");
        SecretKey sk = keygen.generateKey();
        secretkey = Base64.getEncoder().encodeToString(sk.getEncoded());
        this.userRepository = userRepository;
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration((new Date(System.currentTimeMillis() + 1000 * 60 * 30)))
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretkey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);

        System.out.println("extrakted name: " + userName + ", username aus Details: " + userDetails.getUsername());
        System.out.println("isExpired: " + isTokenExpired(token));
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));

    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    public UserEntity getUserFromToken( String authHeader) {
        String username = null;
        String jwt = null;
        if (authHeader != null && authHeader.startsWith("Bearer")) {
            jwt = authHeader.substring(7);
            username = extractUsername(jwt);
        }

        return userRepository.findByUsername(username);
    }
}
