package com.stackroute.repository;

import com.stackroute.model.DoctorSlot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorSlotRepository extends MongoRepository<DoctorSlot,Integer> {

    List<DoctorSlot> findAllByDoctorEmail(String doctorEmail);

    List<DoctorSlot> findAllByDoctorEmailAndSlotDate(String doctorEmail, LocalDate slotDate);
}
