package com.example.dataprep.api;

import com.example.dataprep.common.Code;
import com.example.dataprep.common.Result;
import com.example.dataprep.model.ApiInfo;
import com.example.dataprep.service.ApiInfoService;
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
        if(apiInfo.getIpPermissions() != null) {
            ipPermissions = new JSONObject(apiInfo.getIpPermissions());
        }
        if(apiInfo.getNumOfTagsInGroup() != null) {
            numOfTagsInGroup = new JSONObject(apiInfo.getNumOfTagsInGroup());
        }
        if(apiInfo.getRawData() != null) {
            rawData = new JSONObject(apiInfo.getRawData());
        }
        String usualPort=findUsualPort(ipPermissions);
        String groupCase=findGroupCase(rawData);
        String keyFreq=findKeyFreq(rawData,keyWord);
        String infoStr = "{" +
                "'keyFreq':" + keyFreq  + "," +
                "'numOfIncludeTagsGroup':" + apiInfo.getNumOfTags().toString() + "," +
                "'numOfNotIncludeTagsGroup':" + Integer.toString((apiInfo.getNumOfGroups() - apiInfo.getNumOfTags())) + "," +
                "'usualPort':" + usualPort + "," +
                "'groupCase':" + groupCase + "," +
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
}
