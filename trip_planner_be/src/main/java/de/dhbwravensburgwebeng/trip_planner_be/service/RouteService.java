package de.dhbwravensburgwebeng.trip_planner_be.service;

import de.dhbwravensburgwebeng.trip_planner_be.model.Route;
import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import de.dhbwravensburgwebeng.trip_planner_be.repositories.RouteRepository;
import de.dhbwravensburgwebeng.trip_planner_be.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Service
public class RouteService {
    private final RouteRepository routeRepository;
    private final UserRepository userRepository;

    public RouteService(RouteRepository routeRepository, UserRepository userRepository) {
        this.routeRepository = routeRepository;
        this.userRepository = userRepository;
    }

    public void createRoute( Route route, String name ) {
        UserEntity user = userRepository.findByUsername(name);
        route.setUserID(user);
        routeRepository.save(route);
    }

    public List<String> getAllRouteNamesByUser(UserEntity user) {
        UserEntity userId = userRepository.findByUsername(user.getUsername());
        List<Route> routes = routeRepository.findByUserID(userId);
        List<String> routeNames = new ArrayList<>();
        for (Route route : routes) {
            routeNames.add(route.getName());
        }
        return routeNames;
    }

}
