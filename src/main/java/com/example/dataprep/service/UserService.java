package com.example.dataprep.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.dataprep.model.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface UserService extends IService<User>{
    public boolean save(User user);

    public boolean delete(Integer id);

    public boolean update(User user);

    public User getById(Integer id);

    public List<User> getAll();
}
