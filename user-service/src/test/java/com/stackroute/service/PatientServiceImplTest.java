package com.stackroute.service;

import com.stackroute.model.Patient;
import com.stackroute.repository.PatientRepository;
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
import static org.mockito.Mockito.when;


    @SpringBootTest
    public class PatientServiceImplTest{

    @Mock
    private PatientRepository patientRepository;

    @InjectMocks
    private PatientServiceImplTest patientService;
    private List<Patient> patientList;
    private List<Patient> patientByEmailId;


    private Patient patient;

    @BeforeEach
    public void setUp() {
        patient = new Patient("abhishek@gmail.com","123456","Abhishek Sharma","987654321",new Date(10-07-1992),MALE,"Delhi",null);
        Patient patient1 = new Patient("rahul@gmail.com","12121212","Rahul Kumar","987659876",new Date(25-9-1983),MALE,"Nagpur",null);
        Patient patient2 = new Patient("shivam@gamil.com", "1234567", "Shivam Rastogi", "9876546543", new Date(01-07-1972), MALE,"Nagpur",null);
        Patient patient3 = new Patient("saurabbh@gamil.com", "12368347", "Saurabh Yadav", "9876789876", new Date(23-04-1994), MALE,"Pune",null);

        patientList = new ArrayList<>();
        patientList.add(patient);
        patientList.add(patient1);
        patientList.add(patient2);
        patientList.add(patient3);


        patientByEmailId = new ArrayList<>();
        patientByEmailId.add(patient1);
        patientByEmailId.add(patient2);
    }

//    @Test
//    public void testSavePatient() {
//        Patient patient1 = new Patient("rahul@gmail.com","12121212","Rahul Kumar","987659876",new Date(25-9-1983),MALE,"Nagpur",null);
//
//        when(patientRepository.save(patient1)).thenReturn(patient1);
//
//    }
//
//    @Test
//    public void testFindByEmailId() {
//
//        when(patientRepository.findById("abhishek@gamil.com")).thenReturn(Optional.of(patient));
//    }
}