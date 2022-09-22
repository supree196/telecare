package com.stackroute.service;

    import com.stackroute.model.Email;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.mail.SimpleMailMessage;
    import org.springframework.mail.javamail.JavaMailSender;
    import org.springframework.stereotype.Service;

    import javax.mail.MessagingException;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /* Method to send simple mail for appointment booking*/
    public void sendEmail(Email email) throws MessagingException {

        SimpleMailMessage mail=new SimpleMailMessage();
        mail.setFrom("telecare04@gmail.com");
        mail.setTo(email.getReceiverEmail());
        mail.setText(email.getMessageBody());
        mail.setSubject(email.getSubject());
        try {
            mailSender.send(mail);
            System.out.println("MAil is Delievered");
        }catch (Exception exception){
            System.out.println("MAil not Delievered");
        }
    }
}