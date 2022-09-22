package com.stackroute.service;

import com.stackroute.model.Email;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
@Service
public interface EmailService {
    void sendEmail (Email email)throws MessagingException;
}
