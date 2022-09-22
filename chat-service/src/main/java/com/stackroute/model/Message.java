package com.stackroute.model;


import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Message {

   private LocalDateTime messageTime;
   private String messageContent;
   private byte[] documents;
   private  String senderEmail;
   private  String receiverEmail;

}
