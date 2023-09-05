package Yana_Gulak.PP_3_1_2.service;



import Yana_Gulak.PP_3_1_2.model.User;

import java.util.List;

public interface UserService {
    public void saveUser(User user);
    public User getById (Long id);
    public List<User> getAllUsers();
    public void update (User updateUser);
    public void removeUserById(long id);
}
