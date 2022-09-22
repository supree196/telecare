package com.stackroute.service;

import com.stackroute.exceptions.PasswordNotMatchedException;
import com.stackroute.exceptions.UserAlreadyExistsException;
import com.stackroute.exceptions.UserNotRegisteredException;
import com.stackroute.jwtimpl.AuthenticationRequest;
import com.stackroute.jwtimpl.AuthenticationResponse;
import com.stackroute.jwtimpl.JwtUserDetails;
import com.stackroute.jwtimpl.JwtUtil;
import com.stackroute.model.User;
import com.stackroute.model.UserType;
import com.stackroute.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

public class UserServiceImplTest {

    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtUtil jwtUtil;
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp()
    {
        openMocks(this);
    }

    /*@Test
    public void TestUserLogin_GivenValidUser_WhenAuthenticated_ThenReturnAuthenticateResponse()
    {
        User user=new User("xyz@mail.com","password", UserType.DOCTOR);
        AuthenticationRequest authenticationRequest= new AuthenticationRequest("xyz@gmail.com","password");
        JwtUserDetails jwtUserDetails=new JwtUserDetails(user);
        when(userRepository.findById(anyString())).thenReturn(Optional.of(user));
        when(jwtUtil.generatetoken(jwtUserDetails)).thenReturn(anyString());
        AuthenticationResponse authenticationResponse=new AuthenticationResponse(user.getUserEmail(),true,"");
        AuthenticationResponse actualAuthResp=userService.userLogin(authenticationRequest);
        assertEquals(authenticationRequest.getUserEmail(),actualAuthResp.getUserEmail());
    }

    @Test
    public void TestUserLogin_GivenAUser_WhenNotValidated_ShouldThrowPasswordNotMatchedException()
    {
        User userExpected=new User("xyz@mail.com","password", UserType.DOCTOR);
//        User userActual=new User("xyz@mail.com","passwordd", UserType.DOCTOR);
        AuthenticationRequest authenticationRequest= new AuthenticationRequest("xyz@gmail.com","passwordd");
        when(userRepository.findById(anyString())).thenReturn(Optional.of(userExpected));
        assertThrows(PasswordNotMatchedException.class,()-> userService.userLogin(authenticationRequest));
    }

    @Test
    public void TestUserLogin_GivenAUser_WhenUserNotExists_ShouldThrowUserNotRegisteredException()
    {
//        User user=new User("xyz@mail.com","password", UserType.DOCTOR);
        AuthenticationRequest authenticationRequest= new AuthenticationRequest("xyz@gmail.com","password");
        when(userRepository.findById(anyString())).thenThrow(new UserNotRegisteredException());
        assertThrows(UserNotRegisteredException.class,()-> userService.userLogin(authenticationRequest));
    }

    @Test
    public void TestUserRegister_GivenAUser_WhenUserNotExists_ThenReturnCreatedUser()
    {
        User user=new User("xyz@mail.com","password", UserType.DOCTOR);
        when(userRepository.findById(anyString())).thenReturn(Optional.empty());
        when(userRepository.save(user)).thenReturn(user);
        assertEquals(user.getUserEmail(),userService.userRegister(user).getUserEmail());
    }

    @Test
    public void TestUserRegister_GivenAUser_WhenUserAlreadyExists_ShouldThrowUserAlreadyExistsException()
    {
        User user=new User("xyz@mail.com","password", UserType.DOCTOR);
        when(userRepository.findById(anyString())).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        assertThrows(UserAlreadyExistsException.class,()-> userService.userRegister(user));
    }

    @Test
    public void TestLoadUserByUsername_GivenAUsername_WhenUserExists_ThenReturnUserDetails()
    {
        User user=new User("xyz@mail.com","password", UserType.DOCTOR);
        JwtUserDetails jwtUserDetails=new JwtUserDetails(user);
        when(userRepository.findById(anyString())).thenReturn(Optional.of(user));
        assertEquals(user.getUserEmail(),userService.loadUserByUsername(user.getUserEmail()).getUsername());
    }*/

}
