package com.stackroute.model;

import lombok.Data;


@Data
public class Email {
    private String receiverEmail;
    private String subject;
    private String messageBody;
}
