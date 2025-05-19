package de.dhbwravensburgwebeng.trip_planner_be.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import java.util.Date;

@Data
@Entity
@Table(name = "USERS")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private int age;
    @NotNull
    @Email
    private String email;
    @NotNull
    private String password;
    private Long timestamp = new Date().getTime();


    public User toUser() {
        User user = new User();
        user.setName(this.name);
        user.setAge(this.age);
        user.setEmail(this.email);
        user.setPassword(this.password);
        user.setTimestamp(this.timestamp);
        return user;
    }
}
