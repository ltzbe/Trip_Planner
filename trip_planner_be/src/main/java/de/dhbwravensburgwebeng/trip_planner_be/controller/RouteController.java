package de.dhbwravensburgwebeng.trip_planner_be.controller;

import de.dhbwravensburgwebeng.trip_planner_be.model.Route;
import de.dhbwravensburgwebeng.trip_planner_be.model.UserEntity;
import de.dhbwravensburgwebeng.trip_planner_be.repositories.RouteRepository;
import de.dhbwravensburgwebeng.trip_planner_be.service.JWTService;
import de.dhbwravensburgwebeng.trip_planner_be.service.RouteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RouteController {
    private final RouteService routeService;
    private final HttpServletRequest request;
    private final JWTService jwtService;
    private final RouteRepository routeRepository;

    public RouteController(RouteService routeService, HttpServletRequest request, JWTService jwtService, RouteRepository routeRepository) {
        this.routeService = routeService;
        this.request = request;
        this.jwtService = jwtService;
        this.routeRepository = routeRepository;
    }

    @PostMapping("/routes")
    public ResponseEntity<Void> storeRoute(@RequestBody Route route) {
        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        if (authHeader != null && authHeader.startsWith("Bearer")) {
            jwt = authHeader.substring(7);
            username = jwtService.extractUsername(jwt);
        }

        routeService.createRoute(route, username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/routes/id")
    public ResponseEntity<List<String>> getRouteNamesByUserId() {
        UserEntity user = jwtService.getUserFromToken(request.getHeader("Authorization"));
        List<String> routeNames = routeService.getAllRouteNamesByUser(user);

        return ResponseEntity.ok(routeNames);
    }

    @GetMapping("/routes/name")
    public ResponseEntity<Route> getRouteNamesByUserName(@RequestParam String routeName) {
        UserEntity user = jwtService.getUserFromToken(request.getHeader("Authorization"));
        Route route = routeService.getRouteByName(user, routeName);

        if (route == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(route);
    }
}
