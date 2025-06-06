package de.dhbwravensburgwebeng.trip_planner_be.repositories;

import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    boolean existsById(Long id);

    UserEntity findByUsername(@NotNull String name);

    int getIdByUsername(@NotNull String name);

}

