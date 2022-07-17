package com.example.dataprep.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.dataprep.model.ApiInfo;
import com.example.dataprep.model.User;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface ApiInfoService extends IService<ApiInfo> {
    public ApiInfo getById(Integer id);
}
