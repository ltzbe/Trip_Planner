package de.dhbwravensburgwebeng.trip_planner_be.model;

import lombok.Data;
import lombok.Generated;
import java.util.Date;


@Data
public class User {
    @Generated
    private Long id;
    private String name;
    private String email;
    private String password;

    public UserEntity toUserEntity() {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(this.id);
        userEntity.setName(this.name);
        userEntity.setEmail(this.email);
        userEntity.setPassword(this.password);

        return new UserEntity();
    }

}
