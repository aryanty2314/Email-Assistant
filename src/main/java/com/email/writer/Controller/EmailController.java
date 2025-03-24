package com.email.writer.Controller;

import com.email.writer.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email/api")
@Component
@CrossOrigin(origins = "http://localhost:5173/")
public class EmailController
{
    private final EmailService service;

    public EmailController(EmailService emailService)
{
    this.service = emailService;
}

    @PostMapping("/generate")
    public ResponseEntity<String> generateBody(@RequestBody EmailRequest emailRequest)
    {
        String response  = service.generateReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
