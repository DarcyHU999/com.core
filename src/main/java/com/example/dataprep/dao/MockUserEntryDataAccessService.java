package com.example.dataprep.dao;

import com.example.dataprep.model.UserEntry;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository("mockDao")
public class MockUserEntryDataAccessService implements UserEntryDao {
    private static List<UserEntry> DB = new ArrayList<>();

    @Override
    public int insertUserEntry(String apiURL, String keyword ){
        DB.add(new UserEntry(apiURL,keyword));
        return 1;
    }
}
