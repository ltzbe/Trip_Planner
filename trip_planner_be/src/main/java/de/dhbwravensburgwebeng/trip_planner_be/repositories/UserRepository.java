package de.dhbwravensburgwebeng.trip_planner_be.repositories;

import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    List<UserEntity> id(Long id);
}
