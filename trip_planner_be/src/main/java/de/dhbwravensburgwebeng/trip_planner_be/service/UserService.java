package de.dhbwravensburgwebeng.trip_planner_be.service;

import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import de.dhbwravensburgwebeng.trip_planner_be.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final JWTService jwtService;

    private final AuthenticationManager manager;

    public UserService(UserRepository userRepository, JWTService jwtService, AuthenticationManager manager) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.manager = manager;
    }

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserEntity signup(UserEntity user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return user;
    }

    public String verify (UserEntity user) {
        Authentication auth = manager.authenticate(new UsernamePasswordAuthenticationToken(user.getName(), user.getPassword()));

        if(auth.isAuthenticated()) {
            return jwtService.generateToken(user.getName());
        }
        return "fail";
    }
}
