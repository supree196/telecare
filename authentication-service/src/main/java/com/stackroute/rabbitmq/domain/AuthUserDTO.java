package com.stackroute.rabbitmq.domain;

import com.stackroute.model.UserType;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class AuthUserDTO {

    private String userEmail;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserType userType;
}
