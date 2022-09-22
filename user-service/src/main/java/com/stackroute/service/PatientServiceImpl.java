package com.stackroute.service;

import com.stackroute.model.Patient;
import com.stackroute.rabbitmq.domain.AuthUserDTO;
import com.stackroute.rabbitmq.domain.UserType;
import com.stackroute.rabbitmq.producer.Producer;
import com.stackroute.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private Producer producer;

    /*This method will save the Patient Details */
    @Override
    public Patient savePatient(Patient patient) {
        if (patientRepository.findById(patient.getPatientEmailId()).isPresent()) {
            throw new RuntimeException("Already Exist");
        }
        AuthUserDTO authUserDto=new AuthUserDTO();
        authUserDto.setUserEmail(patient.getPatientEmailId());
        authUserDto.setPassword(patient.getPassword());
        authUserDto.setUserType(UserType.PATIENT);
        producer.sendAuthUserDtoToRabbitMq(authUserDto);
        return patientRepository.save(patient);

    }

    /*This method will update the Patient Details */
    @Override

    public Patient updatePatient (Patient patient, MultipartFile file) throws IOException {
        if (patientRepository.findById(patient.getPatientEmailId()).isEmpty()){
            throw new RuntimeException("Patient profile doesn't exist");
        }
        patient.setPatientImage(file.getBytes());
        return patientRepository.save(patient);
    }
    /*This method will return all the Patient based on  email id  */
    @Override
    public Patient findByEmailId(String patientEmailId ){
        Patient patient = patientRepository.findById(patientEmailId).orElseThrow(()->{
            throw new UsernameNotFoundException("User ID not Found");
        });
        return patient;
    }
}
