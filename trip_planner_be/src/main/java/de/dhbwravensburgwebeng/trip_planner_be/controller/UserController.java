package de.dhbwravensburgwebeng.trip_planner_be.controller;

import de.dhbwravensburgwebeng.trip_planner_be.model.HelpFunctions;
import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import de.dhbwravensburgwebeng.trip_planner_be.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final HelpFunctions helper;

    public UserController(UserRepository userRepository, HelpFunctions helper) {
        this.userRepository = userRepository;
        this.helper = helper;
    };


    @PostMapping("/signup")
    public UserEntity createUser(@RequestBody @Validated UserEntity user) {
        user.setPassword(HelpFunctions.hash(user.getPassword()));
        userRepository.save(user);
        return user;
    }

    @PostMapping("/login")
    public ResponseEntity<UserEntity> login(@RequestBody @Validated UserEntity user) {
        if (!userRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if  (helper.checkPassword(user.getPassword(), user.getEmail())){
            Long userId = userRepository.findIdByEmail(user.getEmail());
            user.setPassword(HelpFunctions.hash(user.getPassword()));
            user.setId(userId);
            user.setTimestamp(new Date().getTime());
            userRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

    }

    @DeleteMapping("/user/id")
    public void deleteUser(@RequestParam Long id) {
        userRepository.deleteById(id);
    }

    @PutMapping("/user/id")
    public UserEntity updateUser(@RequestParam Long id, @RequestBody @Validated UserEntity user) {
        user.setId(id);
        userRepository.save(user);
        return user;
    }

    @GetMapping("/user/id")
    public ResponseEntity<UserEntity> getUserById(@RequestParam Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    System.out.println("Found user: " + user); // Should print user details
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/users")
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

}
