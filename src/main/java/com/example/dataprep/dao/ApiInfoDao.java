package com.example.dataprep.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.dataprep.model.ApiInfo;
import com.example.dataprep.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
@Mapper
public interface ApiInfoDao extends BaseMapper<ApiInfo> {
    @Select("select * from ApiInfo where id = #{id}")
    ApiInfo getById(Integer id);
}
