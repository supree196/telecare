package com.stackroute.service;

import com.stackroute.model.DoctorSlot;

import java.util.List;

public interface DoctorSlotService {

    DoctorSlot createSlot(DoctorSlot doctorSlot);

    DoctorSlot updateSlot(DoctorSlot doctorSlot);

    List<DoctorSlot> getAllSlotsByDoctorEmail(String doctorEmail);
    List<DoctorSlot> getAllSlots();

    int getSequenceNumber(String sequenceName);
}
