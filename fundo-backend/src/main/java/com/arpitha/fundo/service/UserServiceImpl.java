package com.arpitha.fundo.service;

import com.arpitha.fundo.model.User;
import com.arpitha.fundo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService {

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(User user){
        userRepository.insert(user);
    }

    public List<User> getUserByFirstName(String name){
        return userRepository.findUsersByFirstName(name);
    }

    public User getUserByEmailAndPass(String email, String password){
        return userRepository.findByEmailAndPassword(email,password)
                .orElseThrow(()-> new RuntimeException(
                        String.format("cannot find user by email %s", email)
                ));
    }

    public List<User> getAllUsers(){
         return userRepository.findAll();
    }

    public void updateUser(User user){
        User dbUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannot find user by ID %s",user.getId())
                ));
        dbUser.setFirstName(user.getFirstName());
        dbUser.setLastName(user.getLastName());
        dbUser.setEmail(user.getEmail());
        dbUser.setPassword(user.getPassword());
        userRepository.save(dbUser);
    }

    public void deleteUser(String id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException(
                String.format("Cannot find user by ID %s",id)
        ));
        userRepository.delete(user);
    }

    @Autowired
    UserRepository userRepository;
}
