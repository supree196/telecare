package com.stackroute.controller;

import com.stackroute.model.DoctorSlot;
import com.stackroute.service.DoctorSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v3")
//@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {

    @Autowired
    private DoctorSlotService doctorSlotService;

    @PostMapping("/slot")
    public ResponseEntity<DoctorSlot> createSlot(@RequestBody DoctorSlot doctorSlot)
    {
        doctorSlot.setSlotId(doctorSlotService.getSequenceNumber(DoctorSlot.SEQUENCE_NAME));
        return new ResponseEntity<>(doctorSlotService.createSlot(doctorSlot),HttpStatus.CREATED);
    }

    @PutMapping("/slot")
    public ResponseEntity<DoctorSlot> updateSlot(@RequestBody DoctorSlot doctorSlot)
    {
        return new ResponseEntity<>(doctorSlotService.updateSlot(doctorSlot),HttpStatus.CREATED);
    }

    @GetMapping("/slot/{doctorEmail}")
    public ResponseEntity<List<DoctorSlot>> getAllSlotsByDoctorEmail(@PathVariable String doctorEmail)
    {
        if(doctorSlotService.getAllSlotsByDoctorEmail(doctorEmail).isEmpty())
        {
            return new ResponseEntity<>(doctorSlotService.getAllSlotsByDoctorEmail(doctorEmail),HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(doctorSlotService.getAllSlotsByDoctorEmail(doctorEmail),HttpStatus.OK);
    }

    @GetMapping("/slots")
    public ResponseEntity<List<DoctorSlot>> getAllSlots()
    {
        return new ResponseEntity<>(doctorSlotService.getAllSlots(),HttpStatus.OK);
    }


}
