package de.dhbwravensburgwebeng.trip_planner_be.controller;

import de.dhbwravensburgwebeng.trip_planner_be.dto.AuthResponse;
import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import de.dhbwravensburgwebeng.trip_planner_be.service.JWTService;
import de.dhbwravensburgwebeng.trip_planner_be.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@Tag(name = "User Management", description = "Operations related to creating and validating users")
public class UserController {

    private final UserService userService;
    private final JWTService jwtService;

    public UserController(UserService userService, JWTService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public AuthResponse createUser(@RequestBody @Validated UserEntity user) {
        userService.signup(user);
        String username = user.getUsername();
        String token = jwtService.generateToken(username);
        return new AuthResponse(token, username);
    }

    @PostMapping ("/login")
    public AuthResponse login(@RequestBody @Validated UserEntity user) {
        String username = user.getUsername();
        String token = userService.verify(user);
        return new AuthResponse(token, username);
    }

//    @DeleteMapping("/user/id")
//    public ResponseEntity<UserEntity> deleteUser(@RequestParam Long id) {
//        if (userRepository.existsById(id)) {
//            userRepository.deleteById(id);
//            return new ResponseEntity<>(HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
//
//    @GetMapping("/user/id")
//    public ResponseEntity<UserEntity> getUserById(@RequestParam Long id) {
//        return userRepository.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @GetMapping("/user")
//    public List<UserEntity> getAll() {
//        return userRepository.findAll();
//    }

}
