package com.stackroute.service;

import com.stackroute.model.Doctor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DoctorService {

    /*This method will save the Doctor Details */
    Doctor saveDoctor(Doctor doctor);

    /*This method will update the Doctor Details */
    Doctor updateDoctor(Doctor doctor,MultipartFile file)throws IOException;

    /*This method will return all the  doctor based on  email id  */
    Doctor findByEmailId(String doctorEmailId);

    List getAllDoctors();

}
