package com.stackroute.service;

import com.stackroute.model.Patient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PatientService {
    /*This method will save the Patient Details */
    Patient savePatient(Patient patient);
    /*This method will update the Patient Details */
    Patient updatePatient(Patient patient,MultipartFile file)throws IOException;
    /*This method will return all the Patient based on  email id  */
    Patient findByEmailId(String patientEmailId);
}
