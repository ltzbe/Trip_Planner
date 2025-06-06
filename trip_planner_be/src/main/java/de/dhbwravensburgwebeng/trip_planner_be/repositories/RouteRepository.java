package de.dhbwravensburgwebeng.trip_planner_be.repositories;

import de.dhbwravensburgwebeng.trip_planner_be.model.Route;
import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long>{
    List<Route> findByUserID(UserEntity userID);

    Route findRouteByNameAndUserID(String routeName, UserEntity userId);

    Route findRouteByName(String name);
}
