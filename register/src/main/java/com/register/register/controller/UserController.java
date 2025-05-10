package com.register.register.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;


import com.register.register.models.Users;

import com.register.register.service.UserService; // Import the UserService

@RestController 
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService; // Use camelCase for variable names
    
    
  
    
   @GetMapping("/message")
    public String first() { // Return type should be String
        return "Hello world";
    }

    @PostMapping("/post")
    public Object postData(@RequestBody Users user) {
        return userService.postData(
                user.getEmail(),
                user.getId(),
                user.getName(),
                user.getPassword(),
                user.getUsername()
        );
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Integer id) {
		boolean isDeleted=userService.deleteUser(id);
		
		if(isDeleted) {
			return "User With ID "+id +"was sucessfully Deleted";
		}
		else {
			return "user With ID" +id+"not found";
		}
    	
    }
    @GetMapping("/all")
    public Object getAllUsers() {
    	return userService.getAllUsers();
    }
    
    
    
    
}