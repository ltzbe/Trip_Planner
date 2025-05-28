package de.dhbwravensburgwebeng.trip_planner_be.model;

import lombok.Data;
import lombok.Generated;


@Data
public class User {
    @Generated
    private Long id;
    private String username;
    private String email;
    private String password;

    public UserEntity toUserEntity() {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(this.id);
        userEntity.setUsername(this.username);
        userEntity.setEmail(this.email);
        userEntity.setPassword(this.password);

        return new UserEntity();
    }

}
