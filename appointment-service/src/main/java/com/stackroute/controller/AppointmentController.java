package com.stackroute.controller;

import com.stackroute.model.BookAppointment;
import com.stackroute.service.BookAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v3")
//@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private BookAppointmentService bookAppointmentService;

    @PostMapping("/appointment")
    public ResponseEntity<BookAppointment> bookAppointment(@RequestBody BookAppointment bookAppointment)
    {
        bookAppointment.setAppointmentId(bookAppointmentService.getSequenceNumber(BookAppointment.SEQUENCE_NAME));
        return new ResponseEntity<>(bookAppointmentService.createAppointment(bookAppointment),HttpStatus.CREATED);
    }

    @GetMapping("/appointment/doctor/{doctorEmail}")
    public ResponseEntity<List<BookAppointment>> getAppointmentsByDoctorEmail(@PathVariable String doctorEmail)
    {
        if(bookAppointmentService.getAllAppointmentsByDoctorEmail(doctorEmail).isEmpty())
        {
            return new ResponseEntity<>(bookAppointmentService.getAllAppointmentsByDoctorEmail(doctorEmail),HttpStatus.NO_CONTENT);
        }
        else
        {
            return new ResponseEntity<>(bookAppointmentService.getAllAppointmentsByDoctorEmail(doctorEmail),HttpStatus.OK);
        }
    }

    @GetMapping("/appointment/patient/{patientEmail}")
    public ResponseEntity<List<BookAppointment>> getAppointmentsByPatientEmail(@PathVariable String patientEmail)
    {
        if(bookAppointmentService.getAllAppointmentsByPatientEmail(patientEmail).isEmpty())
        {
            return new ResponseEntity<>(bookAppointmentService.getAllAppointmentsByPatientEmail(patientEmail),HttpStatus.NO_CONTENT);
        }
        else
        {
            return new ResponseEntity<>(bookAppointmentService.getAllAppointmentsByPatientEmail(patientEmail),HttpStatus.OK);
        }
    }

}
