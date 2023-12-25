package com.arpitha.fundo.repository;


import com.arpitha.fundo.model.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Qualifier("user")
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    @Query("{'email':?0, 'password':?1}")
    Optional<User> findByEmailAndPassword(String email, String password);

    @Query("{'firstName':/^?0/}")
    List<User> findUsersByFirstName(String name);
}
