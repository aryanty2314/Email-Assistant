package com.email.writer.service;

import com.email.writer.Controller.GeminiRequest;
import com.email.writer.GeminiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeminiService
{
@Autowired
    private GeminiRepository geminiRepository;

public GeminiRequest getUrlAndKey()
{
    List<GeminiRequest> request = geminiRepository.findAll();
    return request.isEmpty() ? null : request.get(0);
}
}
