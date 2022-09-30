package net.sukhdev.springreact.springreact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import net.sukhdev.springreact.springreact.model.User;
import net.sukhdev.springreact.springreact.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("api/")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("users")
    public List < User > getUsers() {
        return this.userRepository.findAll();
    }
    @DeleteMapping("users/delete/{id}")
    public String deleteUserById(@PathVariable long id) {
        userRepository.deleteById(id);
        return "successfully deleted";
    }

    @GetMapping("users/get/{id}")
    public User getUser(@PathVariable long id) {
        List<User> users = userRepository.findAll();
        if(!users.isEmpty()) {
            for (User user: users) {
                if (user.getUserId() == id) {
                    return user;
                }
            }
        }
        return null;
    }

    @PostMapping("users/create")
    public String createUser(@RequestBody User user){
        userRepository.save(user);
        return "successfully user added";
    }

    @PutMapping("users/update/{id}")
    public String updateUser(@PathVariable long id,@RequestBody User user) {
        List<User> userList = userRepository.findAll();

        for(User usr : userList) {
            if(usr.getUserId() == id)
            {
                usr.setFirstName(user.getFirstName());
                usr.setLastName(user.getLastName());
                usr.setEmail(user.getEmail());
                userRepository.save(usr);
            }
        }

        return "success";
    }


}