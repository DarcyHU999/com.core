package com.example.dataprep.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.dataprep.model.ApiInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ApiInfoDao extends BaseMapper<ApiInfo> {
    @Select("select * from ApiInfo where id = #{id}")
    ApiInfo getById(Integer id);

    @Update({"<script>",
            "update ApiInfo",
            "  <set>",
            "    <if test='type != null'>type=#{type},</if>",
            "    <if test='service != null'>service=#{service},</if>",
            "    <if test='region != null'>region=#{region},</if>",
            "    <if test='rawData != null'>rawData=#{rawData},</if>",
            "    <if test='numOfGroups != null'>numOfGroups=#{numOfGroups},</if>",
            "    <if test='numOfTags != null'>numOfTags=#{numOfTags},</if>",
            "    <if test='numOfTagsInGroup != null'>numOfTagsInGroup=#{numOfTagsInGroup},</if>",
            "    <if test='ipPermissions != null'>ipPermissions=#{ipPermissions},</if>",
            "    <if test='cidrBlock != null'>cidrBlock=#{cidrBlock},</if>",
            "    <if test='privateIpAddress != null'>privateIpAddress=#{privateIpAddress},</if>",
            "    <if test='score != null'>score=#{score},</if>",
            "  </set>",
            "where id=#{id}",
            "</script>"})
    int update(ApiInfo apiInfo);

    @Select("select * from ApiInfo")
    List<ApiInfo> getAll();

    @Select("select count(*) from ApiInfo")
    Integer getApiNum();
}
