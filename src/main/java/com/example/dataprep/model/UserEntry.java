package com.example.dataprep.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;

public class UserEntry {
    @NotBlank
    private final String apiURL;

    @NotBlank
    private final String keyword;

    public UserEntry(@JsonProperty("apiURL") String apiURL,
                     @JsonProperty("keyword") String name) {
        this.apiURL = apiURL;
        this.keyword = name;
    }

    public String getApiURL() {
        return apiURL;
    }

    public String getKeyword() {
        return keyword;
    }
}
