package com.arpitha.fundo.service;

import com.arpitha.fundo.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public void addUser(User user);
    public User getUserByEmailAndPass(String email, String password);
    public List<User> getAllUsers();
    public void updateUser(User user);
    public void deleteUser(String id);
}
