package com.stackroute.rabbitmq.consumer;

import com.stackroute.model.User;
import com.stackroute.rabbitmq.domain.AuthUserDTO;
import com.stackroute.service.UserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    @Autowired
    private UserService userService;

    @RabbitListener(queues = "queueAuthUserDto")
    public void getAuthUserDtoFromRabbitMq(AuthUserDTO authUserDTO)
    {
        User user=new User();
        user.setUserEmail(authUserDTO.getUserEmail());
        user.setPassword(authUserDTO.getPassword());
        user.setUserType(authUserDTO.getUserType());
        userService.userRegister(user);
    }

}
