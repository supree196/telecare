package com.stackroute.controller;

import com.stackroute.model.Chat;
import com.stackroute.model.Message;
import com.stackroute.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1")
//@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {
@Autowired
    private ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }
    /* Create API endpoints as per the requirements given below
     */

    /*
    description : save chat
    api endpoint : /chat
    http request : POST
    request body : chat details
    success response : Created:201
    failure response : Bad Request : 400
    */
    @PostMapping("/chat")
    public ResponseEntity<Chat> saveChat (@RequestParam int appointmentId, @RequestBody Message message){
        return new ResponseEntity<>(chatService.createChat(appointmentId,message), HttpStatus.CREATED);
    }

    /*
   description : get chat by appointmentId
   api endpoint : /chat/appointmentId
   http request : GET
   request body : chat details
   success response : Created:201
   failure response : Bad Request : 400
   */
   @GetMapping("/chat/{appointmentId}")
    public  ResponseEntity<Chat> getByAppointmentId(@PathVariable int appointmentId){
        return new ResponseEntity<>(chatService.chatByAppointment(appointmentId), HttpStatus.OK);
   }
}