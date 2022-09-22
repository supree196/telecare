package com.stackroute.controller;

import com.stackroute.jwtimpl.AuthenticationRequest;
import com.stackroute.model.User;
import com.stackroute.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v2")
public class UserController {

    @Autowired
    private UserService userService;

//    @Autowired
//    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody AuthenticationRequest authenticationRequest)
//    public ResponseEntity userLogin(@RequestBody User user)
    {
        if(userService.userLogin(authenticationRequest)==null)
        {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(userService.userLogin(authenticationRequest),HttpStatus.OK);
//        return ResponseEntity.status(HttpStatus.OK).body(userService.userLogin(user));
    }

//    Used for Testing purpose only
    @PostMapping("/createuser")
    public ResponseEntity<User> userRegister(@RequestBody User user)
    {
        return new ResponseEntity<>(userService.userRegister(user),HttpStatus.CREATED);
    }

    @GetMapping("/usertype")
    public ResponseEntity getUserType(@RequestParam String userId)
    {
        return new ResponseEntity<>(userService.getUserType(userId), HttpStatus.OK);
    }

    /*@RequestMapping(value = "/createjwt", method = RequestMethod.POST)
    public AuthenticationResponse createAuthenticationToken(@RequestBody User user) throws Exception{

        System.out.println("Inside createAuthentication token");
        try
        {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUserEmail(),user.getPassword())
//                   ,new ArrayList<GrantedAuthority>(Arrays.asList(new SimpleGrantedAuthority(user.getUserType().toString()))))
            );
        }
        catch (BadCredentialsException bc)
        {
            throw new Exception("Incorrect username or password...");
        }
        final UserDetails userDetails= userService.loadUserByUsername(user.getUserEmail());
        final String jwt= jwtUtil.generatetoken(userDetails);
        System.out.println("Jwt is: " + jwt);
        return new AuthenticationResponse(user.getUserEmail(),jwt);

    }*/

    @PreAuthorize("hasRole(DOCTOR)")
    @GetMapping("/welcome")
    public String sayWelcome()
    {
        return "Congrats... you have been authorized ";
    }

}
