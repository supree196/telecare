package com.stackroute.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document(collection = "sequencebookappointment")
public class SequenceBookAppointment {

    @Id
    private String id;
    private int seq;

}
