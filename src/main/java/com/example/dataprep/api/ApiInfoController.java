package com.example.dataprep.api;

import com.example.dataprep.common.Code;
import com.example.dataprep.common.Result;
import com.example.dataprep.model.ApiInfo;
import com.example.dataprep.model.User;
import com.example.dataprep.service.ApiInfoService;
import com.example.dataprep.service.UserService;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.StringReader;
import java.util.*;

@RestController
@RequestMapping("/api/ApiInfo")
public class ApiInfoController {
    @Autowired
    private ApiInfoService apiInfoService;

    @CrossOrigin( origins ="http://localhost:3000")
    @RequestMapping(path = "/{ids}/{keyWord}", method = RequestMethod.GET)
    public Result getById(@PathVariable String ids, @PathVariable String keyWord){
        List<String> info = new ArrayList<>();
        String[] arrOfIds = ids.split(",");
        for(String id:arrOfIds) {
            info.add(dealWithApi(Integer.parseInt(id), keyWord));
        }
        String infoStr = info.toString();
        Integer code = info != null ? Code.GET_OK : Code.GET_ERR;
        String msg = info != null ? "Query successfully!": "Data query failure";
        return new Result(code, infoStr, msg);
    }

    public String dealWithApi(Integer id,String keyWord){
        ApiInfo apiInfo = apiInfoService.getById(id);
        JSONObject ipPermissions = new JSONObject();
        JSONObject numOfTagsInGroup = new JSONObject();
        JSONObject rawData = new JSONObject();
        JSONObject cidrBlock = new JSONObject();
        JSONObject privateIpAddress = new JSONObject();
        if(apiInfo.getIpPermissions() != null) {
            ipPermissions = new JSONObject(apiInfo.getIpPermissions());
        }
        if(apiInfo.getNumOfTagsInGroup() != null) {
            numOfTagsInGroup = new JSONObject(apiInfo.getNumOfTagsInGroup());
        }
        if(apiInfo.getRawData() != null) {
            rawData = new JSONObject(apiInfo.getRawData());
        }
        if(apiInfo.getPrivateIpAddress() != null) {
            privateIpAddress = new JSONObject(apiInfo.getPrivateIpAddress());
        }
        if(apiInfo.getCidrBlock() != null) {
            cidrBlock = new JSONObject(apiInfo.getCidrBlock());
        }

        String usualPort=findUsualPort(ipPermissions);
        String groupCase=findGroupCase(rawData);
        String keyFreq=findKeyFreq(rawData,keyWord);
        String infoStr = "{" +
                "\"botoType\":" + "\"" + apiInfo.getType() + "\""  + "," +
                "\"service\":" + "\"" + apiInfo.getService() + "\"" + "," +
                "\"keyFreq\":" + keyFreq  + "," +
                "\"numOfIncludeTagsGroup\":" + apiInfo.getNumOfTags().toString() + "," +
                "\"numOfNotIncludeTagsGroup\":" + (apiInfo.getNumOfGroups() - apiInfo.getNumOfTags()) + "," +
                "\"usualPort\":" + usualPort + "," +
                "\"rawData\":" + rawData + "," +
                "\"groupCase\":" + groupCase +
                "}";
        return infoStr;
    }

    public String findKeyFreq(JSONObject rawData,String keyWord){
        String s = rawData.toString();
        int count = 0;
        for (int pos = s.indexOf(keyWord); pos >= 0; pos = s.indexOf(keyWord, pos + 1)) {
            count++;
        }
        return Integer.toString(count);
    }


    public String findGroupCase(JSONObject rawData){
        if(rawData.isEmpty()){
            return null;
        }
        Set<String> keySet=rawData.keySet();
        for(String str : keySet){
            JSONArray arr = rawData.getJSONArray(str);
            if(!arr.isEmpty()){
                return arr.get(0).toString();
            }else{
                return null;
            }
        }
        return null;
    }

    public String findUsualPort(JSONObject ipPermission){
        Set<String> keySet=ipPermission.keySet();
        Map<String,Integer> hashMap = new HashMap<String,Integer>();
        for(String str: keySet){
            JSONArray arr = ipPermission.getJSONArray(str);
            for(int i=0;i<arr.length();i++){
                String port = arr.getJSONObject(i).getJSONArray("port").toString();
                int c =1;
                if(hashMap.containsKey(port)){
                    hashMap.compute(port,(key,val) -> val + 1);
                }else{
                    hashMap.put(port,1);
                }
            }
        }
        List<Map.Entry<String,Integer>> list = new ArrayList(hashMap.entrySet());
        if(!list.isEmpty()){
            Collections.sort(list, (o1, o2) -> (o2.getValue() - o1.getValue()));

            return list.get(0).getKey();}
        else{
            return null;
        }
    }
    @Autowired
    UserService userService;

    public Integer gradedNumber() {
        Integer userNumber = 0;
        List<User> userList = userService.getAll();
        for (User user : userList) {
            if (user.getGrade() != null){
                userNumber ++;
            }
        }
        return userNumber;
    }

    @CrossOrigin( origins ="http://localhost:3000")
    @RequestMapping(path = "/scoring", method = RequestMethod.PUT)
    public Result update(@RequestBody String jsonString){
        JSONObject jsonObject = new JSONObject(jsonString);
        Integer gradedNumber = gradedNumber() + 1;
        Integer numOfApis = apiInfoService.getApiNum();
        boolean flag = true;
        for(int i = 1; i < numOfApis + 1;i++){
            ApiInfo apiInfo = apiInfoService.getById(i);
            String newAddGrade =jsonObject.getString(Integer.toString(i));
            Float newScore = ((apiInfo.getScore()*(gradedNumber-1) + Integer.parseInt(newAddGrade))/gradedNumber);
            Float oldScore = apiInfo.getScore();
            apiInfo.setScore(newScore);
            if(newScore == oldScore){
                flag = true;
            }else {
                flag = apiInfoService.update(apiInfo);
            }
            if (flag == true){
                continue;
            }else{
                break;
            }
        }
        return new Result(flag ? Code.UPDATE_OK:Code.UPDATE_ERR, flag);
    }
}
