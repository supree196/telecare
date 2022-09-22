package com.stackroute.service;

import com.stackroute.model.Chat;
import com.stackroute.model.Message;
import com.stackroute.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService{

   private ChatRepository chatRepository;
@Autowired
    public ChatServiceImpl(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

  /*Methdo to a create chat */
    @Override
    public Chat createChat(Integer appointmentId, Message message) {
        List chats = new ArrayList();
        if (chatRepository.findById(appointmentId).isEmpty())
        {
            chats.add(message);
            chatRepository.save(new Chat(appointmentId,chats));
            return new Chat(appointmentId,chats);
        }
       chats = chatRepository.findById(appointmentId).get().getChat();
        chats.add(message);
        return chatRepository.save(new Chat(appointmentId,chats));
    }

    /*Methdo to  retrieve chat by appointment ID */
    @Override
    public Chat chatByAppointment(Integer appointmentId) {
        Chat chat = chatRepository.findById(appointmentId).get();
        if (chat!= null){
            return chat;
        }
        else {
            throw new RuntimeException("Appointment ID not found");
        }
    }
}
