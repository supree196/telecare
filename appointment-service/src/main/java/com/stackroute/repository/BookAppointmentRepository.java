package com.stackroute.repository;

import com.stackroute.model.BookAppointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookAppointmentRepository extends MongoRepository<BookAppointment,Integer> {

    List<BookAppointment> findAllByDoctorEmail(String doctorEmail);

    List<BookAppointment> findAllByPatientEmail(String patientEmail);
}
