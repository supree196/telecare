package com.stackroute.controller;

import com.stackroute.model.Email;
import com.stackroute.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class EmailController {
    @Autowired
    private EmailService emailService;

    /* Create API endpoints as per the requirements given below
     */

    /*
    description : Send email
    api endpoint : /sendEmail
    http request : POST
    request body : send email
    success response : Created:201
    failure response : Internal Server Error:500
    */
    @PostMapping("sendEmail")
    public ResponseEntity<HttpStatus> sendEmail(@RequestBody Email email){
        try {
            emailService.sendEmail(email);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
