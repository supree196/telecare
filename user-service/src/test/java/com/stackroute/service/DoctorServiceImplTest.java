package com.stackroute.service;

import com.stackroute.model.Doctor;
import com.stackroute.repository.DoctorRepository;
import com.stackroute.service.DoctorServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.stackroute.model.Gender.MALE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

    @SpringBootTest
    public class DoctorServiceImplTest {

        @Mock
        private DoctorRepository doctorRepository;

        @InjectMocks
        private DoctorServiceImpl doctorService;
        private List<Doctor> doctorList;
        private List<Doctor> doctorByEmailId;


        private Doctor doctor;

        @BeforeEach
        public void setUp() {
            doctor = new Doctor("sauravsharma@gamil.com", "12345678", "Saurav Sharma", "9876543210", new Date(01-04-1995), MALE, 2, "Cardiology", "Delhi", null);
            Doctor doctor1 = new Doctor("abhinaymishra@gamil.com", "87654321", "Abhinay Mishra", "9876543980",new Date( 01 - 07 - 1967), MALE, 8, "Dermatology", "Noida", null);
            Doctor doctor2 = new Doctor("cpavan@gamil.com", "12122121", "C Pavan", "9876546543", new Date(01 - 07 - 1972), MALE, 7, "Neurology", "Nagpur", null);
            Doctor doctor3 = new Doctor("rajatbhatt@gamil.com", "1356789", "Rajat Bhatt", "9876598765", new Date(12 - 10 - 1983), MALE, 4, "Neurology", "Chennai", null);

            doctorList = new ArrayList<>();
            doctorList.add(doctor);
            doctorList.add(doctor1);
            doctorList.add(doctor2);
            doctorList.add(doctor3);


            doctorByEmailId = new ArrayList<>();
            doctorByEmailId.add(doctor1);
            doctorByEmailId.add(doctor2);
        }

//        @Test
//        public void testSaveDoctor() {
//            Doctor doctor1 = new Doctor("abhinaymishra@gamil.com", "87654321", "Abhinay Mishra", "9876543980", new Date(01 - 04 - 1967), MALE, 8, "Dermatology", "Noida", null);
//
//            when(doctorRepository.save(doctor1)).thenReturn(doctor1);
//
//            assertEquals(doctor1, doctorService.saveDoctor(doctor1));
//        }
//
//        @Test
//        public void testFindByEmailId() {
//
//            when(doctorRepository.findById("sauravsharma@gamil.com")).thenReturn(Optional.of(doctor));
//            assertEquals(doctor, doctorService.findByEmailId("sauravsharma@gamil.com"));
//        }
    }