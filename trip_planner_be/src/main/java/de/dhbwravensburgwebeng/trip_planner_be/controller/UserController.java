package de.dhbwravensburgwebeng.trip_planner_be.controller;

import de.dhbwravensburgwebeng.trip_planner_be.config.JwtFilter;
import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import de.dhbwravensburgwebeng.trip_planner_be.service.UserService;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public UserEntity createUser(@RequestBody @Validated UserEntity user) {
        return userService.signup(user);
    }

    @PostMapping ("/login")
    public String login(@RequestBody @Validated UserEntity user) {
        return userService.verify(user);
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
