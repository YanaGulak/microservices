package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findUserById(Long id);

    User findByUsername(String username);

    void update(User updateUser, Long id);

    boolean createUser(User user);

    boolean deleteUserById(long id);

//public List <Role> addRoleToUser(User user,String roleName);

}


