package com.stackroute.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "bookappointment")
public class BookAppointment {

    @Transient
    public static final String SEQUENCE_NAME="bookappointment_sequence";

    @Id
    private Integer appointmentId;
    private String patientEmail;
    private String doctorEmail;
    private String patientIssue;
    private String meetingId;
    private Integer slotId;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate appointmentDate;
    @JsonFormat(pattern = "hh:mm:ss a")
    private LocalTime appointmentStartTime;
    @JsonFormat(pattern="hh:mm:ss a")
    private LocalTime appointmentEndTime;


}
