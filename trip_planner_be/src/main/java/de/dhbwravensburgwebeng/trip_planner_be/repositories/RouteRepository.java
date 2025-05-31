package de.dhbwravensburgwebeng.trip_planner_be.repositories;

import de.dhbwravensburgwebeng.trip_planner_be.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long>{

}
