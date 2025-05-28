package de.dhbwravensburgwebeng.trip_planner_be.model;

import de.dhbwravensburgwebeng.trip_planner_be.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class HelpFunctions {

    private final UserRepository userRepository;

    public HelpFunctions(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String hash(String value){
        return encoder.encode(value);
    }

    public static boolean matches(String hashed, String value){
        return encoder.matches(hashed, value);
    }

    public boolean checkPassword(String plainPassword, String email) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            String hashedPassword = userOpt.get().getPassword();
            return matches(plainPassword, hashedPassword);
        }

        return false; // user not found
    }
}
//    public boolean checkPassword(String plainPassword, String email){
//            Optional<UserEntity> user = userRepository.findByEmail(email);
//            return user.filter(userEntity -> matches(plainPassword, userEntity.getPassword())).isPresent();
//        }
//    }


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