package com.stackroute.service;

import com.stackroute.exceptions.PasswordNotMatchedException;
import com.stackroute.exceptions.UserAlreadyExistsException;
import com.stackroute.exceptions.UserNotRegisteredException;
import com.stackroute.jwtimpl.AuthenticationRequest;
import com.stackroute.jwtimpl.AuthenticationResponse;
import com.stackroute.jwtimpl.JwtUserDetails;
import com.stackroute.jwtimpl.JwtUtil;
import com.stackroute.model.User;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private AuthenticationManager authManager;
    //@Autowired
    private JwtUtil jwtUtil;
    //@Autowired
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl( JwtUtil jwtUtil, UserRepository userRepository) {

        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    //    private static final MyLogger logger=new MyLogger();
    @Override
    public AuthenticationResponse userLogin(AuthenticationRequest authenticationRequest){
//    public Boolean userLogin(User user) {
//        Boolean status = false;
        Optional<User> findUser = userRepository.findById(authenticationRequest.getUserEmail());
//        Optional<User> findUser = userRepository.findByUserEmailAndPassword(user.getUserEmail(), user.getPassword());
        if (findUser.isPresent()) {
            if (authenticationRequest.getPassword().equals(findUser.get().getPassword())) {
//                commented below for testing only
//                    && user.getUserType().equals(findUser.get().getUserType())) {

                final UserDetails userDetails = this.loadUserByUsername(authenticationRequest.getUserEmail());
                final String jwt = jwtUtil.generatetoken(userDetails);
                System.out.println("Jwt is: " + jwt);
                try {
                    authManager.authenticate(
                            new UsernamePasswordAuthenticationToken(findUser.get().getUserEmail(), findUser.get().getPassword()));
//                    ,new ArrayList<SimpleGrantedAuthority>(Arrays.asList(new SimpleGrantedAuthority("ROLE_"+user.getUserType().name()))))
//                            );
                } catch (BadCredentialsException bc) {
                    throw new BadCredentialsException("Bad Credentials...");
                }
                return new AuthenticationResponse(authenticationRequest.getUserEmail(), true, jwt);
//                status = true;
            } else {
                throw new PasswordNotMatchedException("Invalid Password... please retry");
            }
        }
        else
        {
            throw new UserNotRegisteredException("Invalid Credentials or User is Not Registered");
        }
//        return new ResponseEntity<>("Please try again.. using the correct credentials",HttpStatus.NOT_FOUND);
    }


    /*@Override
    public String userLogin(User user)
    {
        Optional<User> findUser=userRepository.findById(user.getUserEmail());
        if(findUser.isPresent())
        {
            if(user.getPassword().equals(findUser.get().getPassword())
                    && user.getUserType().equals(findUser.get().getUserType()))
            {
                return "User logged In";
            }
            *//*else
            {
                throw new PasswordNotMatchedException("Invalid Password... please retry");
            }*//*
        }
        else
        {
            throw new UserNotRegisteredException("Invalid Credentials or User is Not Registered");
        }

        return "Please try again.. using the correct credentials";
    }*/

    @Override
    public User userRegister(User user) {

        if(userRepository.findById(user.getUserEmail()).isPresent())
        {
            throw new UserAlreadyExistsException("User with the given Email already exists");
        }
        else
        {
            user.setUserEmail(user.getUserEmail().toLowerCase());
        }
        return userRepository.save(user);
    }

    @Override
    public String  getUserType(String  userId) {
        if(userRepository.findById(userId).isPresent())
        {
//            return user.getUserType();
            return userRepository.findById(userId).get().getUserType().name();

        }
        else
        {
            throw new RuntimeException("Usertype not verified");
        }
    }

    /*@Override
    public User userRegister(User user) {
        Optional<User> findUser= userRepository.findById(user.getUserEmail());
        if(findUser.isPresent())
        {
            throw new UserAlreadyExistsException("User with the given Email already exists");
        }
        else
        {
            user.setUserEmail(user.getUserEmail().toLowerCase());
        }
        return userRepository.save(user);
    }*/

//    this method will be called iff username is present in the database and all credentials are matched
    @Override
    public UserDetails loadUserByUsername(String username) {
        JwtUserDetails jwtUserDetails;
        System.out.println("Started loadUserByUsername() ");

        User user = userRepository.findById(username).get();
        jwtUserDetails = new JwtUserDetails(user);
        System.out.println(jwtUserDetails);
        return jwtUserDetails;

        /*return new JwtUserDetails(findUser.orElseThrow(()->{
            System.out.println("inside JwtUserDetails constructor...");
            throw new UsernameNotFoundException("Username does not exists..");
        }));*/

        /*return findUser.map(JwtUserDetails::new).orElseThrow(()->{
            throw new UsernameNotFoundException("Username does not exists");
        });*/
    }
}
