package com.stackroute.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.model.Doctor;

import com.stackroute.service.DoctorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/")
//@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {
    ResponseEntity responseEntity;
    @Autowired
    private DoctorService doctorService;
    /* Create API endpoints as per the requirements given below
     */

    /*
    description : register doctor
    api endpoint : /doctor
    http request : POST
    request body : doctor email
    success response : Created:201
    failure response : Internal Server Error:500
    */

    @PostMapping("doctor")
    public ResponseEntity <Doctor> register (@RequestBody Doctor doctor){
      responseEntity= new ResponseEntity(doctorService.saveDoctor(doctor),HttpStatus.CREATED);
        return responseEntity;
    }

    /*
    description : update doctor
    api endpoint : /doctor
    http request : PATCH
    request body : doctor email
    success response : Created:201
    failure response : Internal Server Error:500
    */


    @PatchMapping("doctor")
    public ResponseEntity <Doctor> update (@RequestParam String doctor, @RequestParam MultipartFile file) throws IOException {
        responseEntity= new ResponseEntity(doctorService.updateDoctor(new ObjectMapper().readValue(doctor,Doctor.class),file),HttpStatus.OK);
        return responseEntity;

    }

    /*
    description : Find doctor
    api endpoint : doctor/{doctorEmailId}
    http request : GET
    request body : doctor email
    success response : Created:201
    failure response : Internal Server Error:500
    */

    @GetMapping("doctor/{doctorEmailId}")
    public ResponseEntity <Doctor> userInfo(@PathVariable String doctorEmailId){
        responseEntity=new ResponseEntity<>(doctorService.findByEmailId(doctorEmailId), HttpStatus.OK);
        return responseEntity;
    }

    @GetMapping("doctors")
    public ResponseEntity  getAllDoctors(){
        responseEntity=new ResponseEntity<>(doctorService.getAllDoctors(), HttpStatus.OK);
        return responseEntity;
    }
}
