package com.example.dataprep.api;

import com.example.dataprep.service.UserEntryService;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;
import org.springframework.lang.NonNull;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.nio.charset.Charset;
import java.util.Map;

@RequestMapping("api/v1/UserEntry")
@RestController
public class UserEntryController {
    private final UserEntryService userEntryService;

    public UserEntryController(UserEntryService userEntryService) {
        this.userEntryService = userEntryService;
    }

    @CrossOrigin
    @PostMapping
    public void insertEntryService( @Valid @NonNull @RequestBody Map<String, String> userEntry) throws IOException {
        //userEntryService.insertUserEntry(apiURL,keyword);
        JSONObject jsonFile = readAndAccess(userEntry.get("apiURL"),userEntry.get("keyword"));
        int l = 1;
    }

    private static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    public JSONObject readAndAccess(String apiURL, String keyword) throws IOException {
        InputStream is = new URL(apiURL).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }
}
