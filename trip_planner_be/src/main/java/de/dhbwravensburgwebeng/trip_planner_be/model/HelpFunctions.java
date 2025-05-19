package de.dhbwravensburgwebeng.trip_planner_be.model;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HelpFunctions {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String hash(String value){
        return encoder.encode(value);
    }

    public static boolean matches(String hashed, String value){
        return encoder.matches(hashed, value);
    }
}


//import at.favre.lib.crypto.bcrypt.BCrypt;
//
//public class HelpFunctions {
//
//    public static String hash(String value) {
//        return BCrypt.withDefaults().hashToString(12, value.toCharArray());
//    }
//
//    public static boolean checkPassword(String password, String hash) {
//        return BCrypt.verifyer().verify(password.toCharArray(), hash).verified;
//    }
//}