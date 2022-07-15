package com.example.dataprep.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.dataprep.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserDao extends BaseMapper<User> {

    @Insert("insert into user (username, password, grade) values(#{username}, #{password}, #{grade})")
    int save(User user);

    @Delete("delete from user where id = #{id}")
    int delete(Integer id);

    @Update({"<script>",
            "update user",
            "  <set>",
            "    <if test='username != null'>username=#{username},</if>",
            "    <if test='password != null'>password=#{password},</if>",
            "    <if test='grade != null'>email=#{grade},</if>",
            "  </set>",
            "where id=#{id}",
            "</script>"})
    int update(User user);

    @Select("select * from user where id = #{id}")
    User getById(Integer id);

    @Select("select * from user")
    List<User> getAll();
}
