package com.stackroute.rabbitmq.producer;

import com.stackroute.rabbitmq.domain.AuthUserDTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Component
public class Producer {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Autowired
    private DirectExchange directExchange;

    public void sendAuthUserDtoToRabbitMq(AuthUserDTO authUserDTO)
    {
        rabbitTemplate.convertAndSend(directExchange.getName(),"keyQueueAuthUserDto",authUserDTO);
    }

}
