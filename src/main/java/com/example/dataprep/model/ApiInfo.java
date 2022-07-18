package com.example.dataprep.model;

import org.json.JSONObject;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table (name = "ApiInfo")
public class ApiInfo {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(columnDefinition="CHAR(32)")
    private String accessId;

    @Column(columnDefinition="CHAR(32)")
    private String type;

    @Column(columnDefinition="CHAR(32)")
    private String region;

    @Column(columnDefinition="TEXT")
    private String rawData;

    @Column(columnDefinition="int(11)")
    private Integer numOfGroups;

    @Column(columnDefinition="TEXT")
    private String numOfTagsInGroup;

    @Column(columnDefinition="int(11)")
    private Integer numOfTags;

    @Column(columnDefinition="TEXT")
    private String IpPermissions;

    @Column(columnDefinition="FLOAT")
    private Float score;


    public String getAccessId() {
        return accessId;
    }

    public void setAccessId(String accessId) {
        this.accessId = accessId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getRawData() {
        return rawData;
    }

    public void setRawData(String rawData) {
        this.rawData = rawData;
    }

    public Integer getNumOfGroups() {
        return numOfGroups;
    }

    public void setNumOfGroups(Integer numOfGroups) {
        this.numOfGroups = numOfGroups;
    }

    public String getNumOfTagsInGroup() {
        return numOfTagsInGroup;
    }

    public void setNumOfTagsInGroup(String numOfTagsInGroup) {
        this.numOfTagsInGroup = numOfTagsInGroup;
    }

    public Integer getNumOfTags() {
        return numOfTags;
    }

    public void setNumOfTags(Integer numOfTags) {
        this.numOfTags = numOfTags;
    }

    public String getIpPermissions() {
        return IpPermissions;
    }

    public void setIpPermissions(String ipPermissions) {
        IpPermissions = ipPermissions;
    }


    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public ApiInfo(Integer id, String accessId, String type, String region, String rawData, Integer numOfGroups, String numOfTagsInGroup, Integer num_of_tags, String ipPermissions,Float score) {
        this.id = id;
        this.accessId = accessId;
        this.type = type;
        this.region = region;
        this.rawData = rawData;
        this.numOfGroups = numOfGroups;
        this.numOfTagsInGroup = numOfTagsInGroup;
        this.numOfTags = numOfTags;
        this.IpPermissions = ipPermissions;
        this.score = score;
    }

    public ApiInfo() {

    }


}
