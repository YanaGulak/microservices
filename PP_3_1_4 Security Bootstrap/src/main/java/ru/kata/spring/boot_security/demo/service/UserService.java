package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findUserById(Long id);

    User findByUsername(String username);

    void update(User updateUser, Long id);

    public boolean createUser(User user);

    public boolean deleteUserById(long id);

}


