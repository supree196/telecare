package com.stackroute.service;

import com.stackroute.model.Doctor;
import com.stackroute.rabbitmq.domain.AuthUserDTO;
import com.stackroute.rabbitmq.domain.UserType;
import com.stackroute.rabbitmq.producer.Producer;
import com.stackroute.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private Producer producer;

    /*This method will save the Doctor Details */
    @Override
    public Doctor saveDoctor(Doctor doctor) {
       if (doctorRepository.findById(doctor.getDoctorEmailId()).isPresent()) {
           throw new RuntimeException("Already Exist");
       }
        AuthUserDTO authUserDto=new AuthUserDTO();
        authUserDto.setUserEmail(doctor.getDoctorEmailId());
        authUserDto.setPassword(doctor.getPassword());
        authUserDto.setUserType(UserType.DOCTOR);
        producer.sendAuthUserDtoToRabbitMq(authUserDto);
       return doctorRepository.save(doctor);

    }
    /*This method will update the Doctor Details */
    @Override
    public Doctor updateDoctor (Doctor doctor,MultipartFile file) throws IOException {
        if (doctorRepository.findById(doctor.getDoctorEmailId()).isEmpty()){
            throw new RuntimeException("Doctor profile doesn't exist");
        }
        doctor.setDoctorImage(file.getBytes());
        return doctorRepository.save(doctor);
    }
    /*This method will return all the  doctor based on  email id  */
     @Override
      public Doctor findByEmailId(String doctorEmailId ){
        Doctor doctor = doctorRepository.findById(doctorEmailId).orElseThrow(()->{
            throw new UsernameNotFoundException("User ID not Found");
        });
        return doctor;
     }

    @Override
    public List getAllDoctors() {
        return doctorRepository.findAll();
    }
}
