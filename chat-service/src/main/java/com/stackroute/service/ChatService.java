package com.stackroute.service;

import com.stackroute.model.Chat;
import com.stackroute.model.Message;


public interface ChatService {
    Chat createChat (Integer appointmentId, Message message);
    Chat chatByAppointment (Integer appointmentId);


}
