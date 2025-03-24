package com.email.writer.Controller;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "GeminiThings")


public class GeminiRequest
{
    @Id
    private String id;
    private String Gemini_Url;

    public GeminiRequest() {
    }

    private String Gemini_Key;

    public GeminiRequest(String id, String gemini_Url, String gemini_Key) {
        this.id = id;
        Gemini_Url = gemini_Url;
        Gemini_Key = gemini_Key;
    }

    public String getGemini_Url() {
        return Gemini_Url;
    }

    public void setGemini_Url(String gemini_Url) {
        Gemini_Url = gemini_Url;
    }

    public String getGemini_Key() {
        return Gemini_Key;
    }

    public void setGemini_Key(String gemini_Key) {
        Gemini_Key = gemini_Key;
    }


}
