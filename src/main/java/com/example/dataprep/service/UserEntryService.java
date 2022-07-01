package com.example.dataprep.service;

import com.example.dataprep.dao.UserEntryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UserEntryService {
    private final UserEntryDao userEntryDao;

    @Autowired
    public UserEntryService(@Qualifier("mockDao") UserEntryDao userEntryDao) {
        this.userEntryDao = userEntryDao;
    }
    public int insertUserEntry(String apiURL, String keyword) {
        return userEntryDao.insertUserEntry(apiURL,keyword);
    }
}
