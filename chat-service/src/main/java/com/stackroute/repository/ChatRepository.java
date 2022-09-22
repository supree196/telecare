package com.stackroute.repository;

import com.stackroute.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ChatRepository extends MongoRepository<Chat,Integer> {
}
