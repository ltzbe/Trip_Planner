package de.dhbwravensburgwebeng.trip_planner_be.repositories;

import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

//    List<UserEntity> id(Long id);

    boolean existsByEmail(String email);

    boolean existsById(Long id);

    Optional<UserEntity> findByEmail(@NotNull @Email String email);

    @Query("SELECT u.id FROM UserEntity u WHERE u.email = :email")
    Long findIdByEmail(String email);

    UserEntity findByUsername(@NotNull String name);

}

