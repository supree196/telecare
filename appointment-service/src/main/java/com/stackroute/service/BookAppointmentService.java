package com.stackroute.service;

import com.stackroute.model.BookAppointment;

import java.util.List;

public interface BookAppointmentService {

    BookAppointment createAppointment(BookAppointment bookAppointment);

    List<BookAppointment> getAllAppointmentsByDoctorEmail(String doctorEmail);

    List<BookAppointment> getAllAppointmentsByPatientEmail(String patientEmail);

    int getSequenceNumber(String sequenceName);
    
        


}
