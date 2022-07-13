package com.example.dataprep.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.dataprep.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserDao extends BaseMapper<User> {

    @Insert("insert into users (username, password, grade) values(#{username}, #{password}, #{grade})")
    int save(User user);

    @Delete("delete from users where id = #{id}")
    int delete(Integer id);

    @Update({"<script>",
            "update users",
            "  <set>",
            "    <if test='username != null'>username=#{username},</if>",
            "    <if test='password != null'>password=#{password},</if>",
            "    <if test='grade != null'>email=#{grade},</if>",
            "  </set>",
            "where id=#{id}",
            "</script>"})
    int update(User user);

    @Select("select * from users where id = #{id}")
    User getById(Integer id);

    @Select("select * from users")
    List<User> getAll();
}
