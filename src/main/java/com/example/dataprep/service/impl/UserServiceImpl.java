package com.example.dataprep.service.impl;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.dataprep.dao.UserDao;
import com.example.dataprep.model.User;
import com.example.dataprep.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public boolean save(User user) {
        return userDao.save(user) > 0;
    }

    @Override
    public boolean delete(Integer id) {
        return userDao.delete(id) > 0;
    }

    @Override
    public boolean update(User user) {
        return userDao.update(user) > 0;
    }

    @Override
    public User getById(Integer id) {
        return userDao.getById(id);
    }

    @Override
    public List<User> getAll() {
        return userDao.getAll();
    }
}
