package com.example.dataprep.model;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

public class User implements Serializable {
    @NotBlank
    private Integer id;
    @NotBlank
    private String username;
    @NotBlank
    private String password;

    private Integer grade;

    public User() {
    }

    public User(Integer id, String username, String password, Integer grade) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.grade = grade;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", grade=" + grade +
                '}';
    }
}
