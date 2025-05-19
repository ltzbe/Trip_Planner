package de.dhbwravensburgwebeng.trip_planner_be.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String startPoint;
    private String endPoint;
    private ArrayList<String> stops;
    private int userID;
    private int distance;
    private int time;
}
