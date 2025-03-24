package com.email.writer;

import com.email.writer.Controller.GeminiRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeminiRepository extends MongoRepository<GeminiRequest,String>
{

}
