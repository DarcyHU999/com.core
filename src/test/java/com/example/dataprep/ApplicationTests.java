package com.example.dataprep;

import com.example.dataprep.dao.UserDao;
import com.example.dataprep.model.User;
import com.example.dataprep.service.UserEntryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ApplicationTests {
    @Autowired
    private UserDao userDao;

    @Test
    void testGetById() {
        User user = userDao.getById(1);
        System.out.println(user);
    }

    @Test
    public void testGetALl(){
        List<User> userList = userDao.getAll();
        System.out.println(userList);
    }

}
