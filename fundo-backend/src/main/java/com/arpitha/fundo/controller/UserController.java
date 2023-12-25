package com.arpitha.fundo.controller;

import com.arpitha.fundo.model.User;
import com.arpitha.fundo.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@Controller
@RestController
@RequestMapping("/api/user")
public class UserController {

    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @PostMapping("/register")
    public ResponseEntity<User> addUser(@RequestBody User user){
        userServiceImpl.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody Map<String, String> user){
        User loggedUser = userServiceImpl.getUserByEmailAndPass(user.get("email"), user.get("password"));
        return ResponseEntity.ok(loggedUser);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userServiceImpl.updateUser(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/search")
    public ResponseEntity<List<User>> getUser(@RequestBody String name){
        List<User> users = userServiceImpl.getUserByFirstName(name);
        return ResponseEntity.ok(users);
    }



    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userServiceImpl.getAllUsers());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(String id){
        userServiceImpl.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @Autowired
    UserServiceImpl userServiceImpl;
}
