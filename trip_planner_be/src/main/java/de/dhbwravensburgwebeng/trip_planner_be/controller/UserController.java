package de.dhbwravensburgwebeng.trip_planner_be.controller;

import de.dhbwravensburgwebeng.trip_planner_be.dto.AuthResponse;
import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import de.dhbwravensburgwebeng.trip_planner_be.service.JWTService;
import de.dhbwravensburgwebeng.trip_planner_be.service.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
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
        String username = user.getName();
        String token = jwtService.generateToken(user.getName());
        return new AuthResponse(token, username);
    }

    @PostMapping ("/login")
    public AuthResponse login(@RequestBody @Validated UserEntity user) {
        String username = user.getName();
        String token = userService.verify(user);
        return new AuthResponse(token, username);
    }

    @GetMapping("/test")
    public String test(){
        return "test";
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
//    @PutMapping("/user/id")
//    public UserEntity updateUser(@RequestParam Long id, @RequestBody @Validated UserEntity user) {
//        user.setId(id);
//        user.setTimestamp(new Date().getTime());
//        userRepository.save(user);
//        return user;
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
