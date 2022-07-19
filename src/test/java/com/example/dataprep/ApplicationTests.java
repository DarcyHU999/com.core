package com.example.dataprep;

import com.example.dataprep.model.User;
import com.example.dataprep.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@SpringBootTest
class ApplicationTests {
    @Autowired
    UserService userService;

    @Test
    void gradedNumber() {
        int userNumber = 0;
        List<User> userList = userService.getAll();
        for (User user : userList) {
            if (user.getGrade() != null){
                userNumber ++;
            }
        }
        System.out.println(userNumber);
    }
}
