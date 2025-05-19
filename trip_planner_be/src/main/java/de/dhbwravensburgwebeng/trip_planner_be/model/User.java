package de.dhbwravensburgwebeng.trip_planner_be.model;

import lombok.Data;
import lombok.Generated;
import java.util.Date;


@Data
public class User {
    @Generated
    private Long id;
    private String name;
    private int age;
    private String email;
    private String password;
    private Long timestamp = new Date().getTime();

    public UserEntity toUserEntity() {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(this.id);
        userEntity.setName(this.name);
        userEntity.setAge(this.age);
        userEntity.setEmail(this.email);
        userEntity.setPassword(this.password);
        userEntity.setTimestamp(this.timestamp);

        return new UserEntity();
    }

}
