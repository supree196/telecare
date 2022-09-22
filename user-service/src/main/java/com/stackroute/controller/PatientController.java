package com.stackroute.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.model.Patient;
import com.stackroute.service.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/")
//@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {
    ResponseEntity responseEntity;
    @Autowired
    private PatientService patientService;

    /* Create API endpoints as per the requirements given below
     */

    /*
    description : register patient
    api endpoint : /patient
    http request : POST
    request body : patient email
    success response : Created:201
    failure response : Internal Server Error:500
    */


    @PostMapping("patient")
    public ResponseEntity <Patient> register (@RequestBody Patient patient){
        responseEntity= new ResponseEntity(patientService.savePatient(patient),HttpStatus.CREATED);
        return responseEntity;
    }

    /*
   description : update patient
   api endpoint : /patient
   http request : PATCH
   request body : patient email
   success response : Created:201
   failure response : Internal Server Error:500
   */

    @PatchMapping("patient")
    public ResponseEntity <Patient> update (@RequestParam String patient, @RequestParam MultipartFile file) throws IOException{
        responseEntity= new ResponseEntity(patientService.updatePatient(new ObjectMapper().readValue(patient, Patient.class),file),HttpStatus.OK);
        return responseEntity;
    }


    /*
  description : find patient
  api endpoint : /patient/{patientEmailId}
  http request : GET
  request body : patient email
  success response : Created:201
  failure response : Internal Server Error:500
  */


    @GetMapping("patient/{patientEmailId}")
    public ResponseEntity <Patient> userInfo(@PathVariable String patientEmailId){
        responseEntity=new ResponseEntity<>(patientService.findByEmailId(patientEmailId), HttpStatus.OK);
        return responseEntity;
    }
}
