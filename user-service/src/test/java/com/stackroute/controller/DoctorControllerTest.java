package com.stackroute.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.stackroute.model.Doctor;
import com.stackroute.service.DoctorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.sql.Date;
import java.util.List;

import static com.google.inject.matcher.Matchers.any;
import static com.stackroute.model.Gender.MALE;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ComponentScan(basePackages = "com.stackroute")
@AutoConfigureMockMvc
@ContextConfiguration
@SpringBootTest
public class DoctorControllerTest {

    @Mock
    private DoctorService doctorService;

    @InjectMocks
    private DoctorController doctorController;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;

    private Doctor doctor;
    private List<Doctor> doctorsList;
    private String baseUrl = "/api/v1/doctor/";

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(doctorController).build();


        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        doctor = new Doctor("sauravsharma@gamil.com", "12345678", "Saurav Sharma", "9876543210", new Date(01 - 04 - 1995), MALE, 2, "Cardiology", "Delhi", null);


        List<Doctor> doctorList;
        List<Doctor> doctorByEmailId;
    }
//    @Test
//    public void updateDoctorTest() throws Exception {
//
//        when(doctorService.updateDoctor(any())).thenReturn(doctor);
//
//        mockMvc.perform(put(baseUrl + "doctor").content(mapper.writeValueAsString(doctor))
//                .contentType(MediaType.APPLICATION_JSON));
//    }
}