package com.stackroute.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document
public class Patient {

        @Id
        private String patientEmailId;
        private String  password;
        private String patientName;
        private String contactNo;
        private Date dob;
        private Gender gender;
        private String city;
        private byte[] patientImage;
    }
