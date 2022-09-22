package com.stackroute.model;

import lombok.*;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Chat {

    @Id
    private int appointmentId;
    List<Message> chat ;

}
