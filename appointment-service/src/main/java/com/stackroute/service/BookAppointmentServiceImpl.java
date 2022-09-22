package com.stackroute.service;

import com.stackroute.exception.AppointmentAlreadyCreatedException;
import com.stackroute.exception.SlotNotExistsException;
import com.stackroute.model.BookAppointment;
import com.stackroute.model.DoctorSlot;
import com.stackroute.model.SequenceBookAppointment;
import com.stackroute.repository.BookAppointmentRepository;
import com.stackroute.repository.DoctorSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class BookAppointmentServiceImpl implements BookAppointmentService {

    @Autowired
    private BookAppointmentRepository appointmentRepository;

    @Autowired
    private DoctorSlotRepository doctorSlotRepository;

    @Autowired
    private MongoOperations mongoOperations;

    @Override
    public BookAppointment createAppointment(BookAppointment bookAppointment) {

        Optional<BookAppointment> appointmentFinder=appointmentRepository.findById(bookAppointment.getAppointmentId());
        if(appointmentFinder.isPresent())
        {
            throw new AppointmentAlreadyCreatedException("Appointment already exists with the same Id...");
        }
        else
        {
            Optional<DoctorSlot> bookedSlot= doctorSlotRepository.findById(bookAppointment.getSlotId());
            if(bookedSlot.isPresent())
            {
                bookedSlot.get().setSlotAvailable(false);
                doctorSlotRepository.save(bookedSlot.get());
                return appointmentRepository.save(bookAppointment);
            }
            else {
                throw new SlotNotExistsException("Slot does not exists...");
            }

        }
    }

    @Override
    public List<BookAppointment> getAllAppointmentsByDoctorEmail(String doctorEmail) {
        return appointmentRepository.findAllByDoctorEmail(doctorEmail);
    }

    @Override
    public List<BookAppointment> getAllAppointmentsByPatientEmail(String patientEmail) {
        return appointmentRepository.findAllByPatientEmail(patientEmail);
    }

    @Override
    public int getSequenceNumber(String sequenceName) {
        SequenceBookAppointment counter = mongoOperations.findAndModify(query(where("_id").is(sequenceName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                SequenceBookAppointment.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 10001;
    }
}
