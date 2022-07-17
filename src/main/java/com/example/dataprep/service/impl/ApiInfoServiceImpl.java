package com.example.dataprep.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.dataprep.dao.ApiInfoDao;
import com.example.dataprep.dao.UserDao;
import com.example.dataprep.model.ApiInfo;
import com.example.dataprep.model.User;
import com.example.dataprep.service.ApiInfoService;
import com.example.dataprep.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApiInfoServiceImpl extends ServiceImpl<ApiInfoDao, ApiInfo> implements ApiInfoService {
    @Autowired
    private final ApiInfoDao apiInfoDao;

    @Autowired
    public ApiInfoServiceImpl(ApiInfoDao apiInfoDao) {
        this.apiInfoDao = apiInfoDao;
    }

    public ApiInfo getById(Integer id){
        return apiInfoDao.getById(id);
    }

}
