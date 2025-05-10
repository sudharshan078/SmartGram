package com.register.register.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.register.register.dao.UserDao;
import com.register.register.models.Users;

@Service
public class UserService {
    @Autowired
    UserDao Userdao;
	public Object postData(String email, Integer id, String name,String password,String username) {
		Users user = new Users();
		user.setEmail(email);
		user.setId(id);  
		user.setName(name);
		user.setPassword(password);
		user.setUsername(username);
		
		return Userdao.save(user);
	}
	public boolean deleteUser(Integer id) {
		// TODO Auto-generated method stub
		if(Userdao.existsById(id)) {
			Userdao.deleteById(id);
			return true;
		}
		
		
		return false;
	}
	public Object getAllUsers() {
		// TODO Auto-generated method stub
		return Userdao.findAll();
		
		
		
	}

}
