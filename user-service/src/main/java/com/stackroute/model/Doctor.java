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
    public class Doctor {
        @Id
        private String doctorEmailId;
        private String  password;
        private String doctorName;
        private String contactNo;
        private Date dob;
        private Gender gender;
        private int experience;
        private String specialization;
        private String city;
        private byte[] doctorImage;

    }
