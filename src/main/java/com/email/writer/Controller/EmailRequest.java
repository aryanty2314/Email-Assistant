package com.email.writer.Controller;

import lombok.*;


@Data
@NoArgsConstructor
public class EmailRequest
{
private String emailContent;
private String tone;
    // Constructor
    public EmailRequest(String tone, String emailContent) {
        this.tone = tone;
        this.emailContent = emailContent;
    }

    // Getters
    public String getTone() {
        return tone;
    }

    public String getEmailContent() {
        return emailContent;
    }

    // Setters (if needed)
    public void setTone(String tone) {
        this.tone = tone;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }
}
