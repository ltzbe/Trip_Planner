package de.dhbwravensburgwebeng.trip_planner_be.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ROUTES")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "users_id")
    private UserEntity userID;

    @NotNull
    private String name;

    @NotNull
    @Lob
    private String route;
}
