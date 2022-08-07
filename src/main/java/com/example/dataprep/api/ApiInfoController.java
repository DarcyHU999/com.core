package com.example.dataprep.api;

import com.example.dataprep.common.Code;
import com.example.dataprep.common.Result;
import com.example.dataprep.model.ApiInfo;
import com.example.dataprep.model.User;
import com.example.dataprep.service.ApiInfoService;
import com.example.dataprep.service.UserService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/ApiInfo")
public class ApiInfoController {
    @Autowired
    private ApiInfoService apiInfoService;

    /**
     *
     * @param ids
     * @param keyWord
     * @return com.example.dataprep.common.Result
     * @author Qingyuan Hu
     * @date 2022/8/7 10:53
    */
    @CrossOrigin( origins ="http://localhost:3000")
    @RequestMapping(path = "/{ids}/{keyWord}", method = RequestMethod.GET)
    public Result getById(@PathVariable String ids, @PathVariable String keyWord){ //By responding Get method to return API information front-end needed
        List<String> info = new ArrayList<>();
        String[] arrOfIds = ids.split(",");
        for(String id:arrOfIds) {
            info.add(dealWithApi(Integer.parseInt(id), keyWord));//Method to build json file front-end needed
        }
        String infoStr = info.toString();
        Integer code = info != null ? Code.GET_OK : Code.GET_ERR;
        String msg = info != null ? "Query successfully!": "Data query failure";
        return new Result(code, infoStr, msg);
    }

    /**
     *
     * @param id
     * @param keyWord
     * @return java.lang.String
     * @author Qingyuan Hu
     * @date 2022/8/7 10:53
    */
    public String dealWithApi(Integer id,String keyWord){ //Get apiInfo instance by id
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
        String keyFreq=findKeyFreq(rawData,keyWord);// get key words frequency
        String tagKeys=findTagKeys(rawData);// get keys in tags and its corresponding times
        String tagVals=findTagVals(rawData);// get value in tags and its corresponding times
        // build json format String which send back to front-end
        String infoStr = "{" +
                "\"botoType\":" + "\"" + apiInfo.getType() + "\""  + "," +
                "\"service\":" + "\"" + apiInfo.getService() + "\"" + "," +
                "\"keyFreq\":" + keyFreq  + "," +
                "\"numOfIncludeTagsGroup\":" + apiInfo.getNumOfTags().toString() + "," +
                "\"numOfNotIncludeTagsGroup\":" + (apiInfo.getNumOfGroups() - apiInfo.getNumOfTags()) + "," +
                "\"usualPort\":" + usualPort + "," +
                "\"tagKeys\":" + tagKeys + "," +
                "\"tagVals\":" + tagVals + "," +
                "\"score\":" + apiInfo.getScore().toString() + "," +
                "\"rawData\":" + rawData + "," +
                "\"groupCase\":" + groupCase +
                "}";
        return infoStr;
    }

    /**
     *
     * @param rawData
	 * @param keyWord
     * @return java.lang.String
     * @author Qingyuan Hu
     * @date 2022/8/7 10:53
    */
    public String findKeyFreq(JSONObject rawData,String keyWord){
        String s = rawData.toString();
        int count = 0;
        for (int pos = s.indexOf(keyWord); pos >= 0; pos = s.indexOf(keyWord, pos + 1)) {
            count++;
        }
        return Integer.toString(count);
    }

    /**
     *
     * @param rawData
     * @return java.lang.String
     * @author Qingyuan Hu
     * @date 2022/8/7 10:54
    */
    public String findGroupCase(JSONObject rawData){
        if(rawData.isEmpty()){
            return null;
        }
        Set<String> keySet=rawData.keySet();
        for(String str : keySet){
            try {
                JSONArray arr = rawData.getJSONArray(str);
                if (!arr.isEmpty()) {
                    return arr.get(0).toString();
                } else {
                    return null;
                }
            }catch (Exception e){
                return rawData.get(str).toString();
            }

        }
        return null;
    }

    /**
     *
     * @param hm
     * @return java.util.HashMap<java.lang.String,java.lang.Integer>
     * @author Qingyuan Hu
     * @date 2022/8/7 10:54
    */
    public static HashMap<String, Integer> sortByValue(HashMap<String, Integer> hm) //sort hashMap by value
    {
        List<Map.Entry<String, Integer> > list =
                new LinkedList<Map.Entry<String, Integer> >(hm.entrySet());
        Collections.sort(list, new Comparator<Map.Entry<String, Integer> >() {
            public int compare(Map.Entry<String, Integer> o1,
                               Map.Entry<String, Integer> o2)
            {
                return (o2.getValue()).compareTo(o1.getValue());
            }
        });
        HashMap<String, Integer> temp = new LinkedHashMap<String, Integer>();
        for (Map.Entry<String, Integer> aa : list) {
            temp.put(aa.getKey(), aa.getValue());
        }
        return temp;
    }

    /**
     *
     * @param rawData
     * @return java.lang.String
     * @author Qingyuan Hu
     * @date 2022/8/7 10:54
    */
    public String findTagKeys(JSONObject rawData){ //find "keys" in "tags" in jsonObject
        if(rawData.isEmpty()){
            return null;
        }
        Iterator<String> keys = rawData.keys();
        StringBuilder key = new StringBuilder("");
        HashMap<String,Integer> resultTemp = new HashMap<String,Integer>();
        if(keys.hasNext()){
            key.append((String)keys.next());
        }else{
            return null;
        }
        String p = new String("(\"Tags\"|\"TagSet\"):\\[[^\\[\\]]+\\]");
        String str =rawData.toString();
        Pattern pattern = Pattern.compile(p);
        Matcher matcher = pattern.matcher(str);
        while (matcher.find()) {
            String st= matcher.group(0);
            JSONObject tags = new JSONObject("{"+st+"}");
            JSONArray arr = tags.getJSONArray("Tags");
            for(int i = 0; i<tags.length();i++){
                JSONObject tag = arr.getJSONObject(i);
                String k = tag.getString("Key");
                if(resultTemp.containsKey(k)){
                    resultTemp.compute(k,(KEY,VAL)-> VAL + 1);
                }else{
                    resultTemp.put(k,1);
                }
            }
        }
        Map<String,Integer> result = sortByValue(resultTemp);
        Map<String, Integer> finalResult = new HashMap<String, Integer>();
        int flag = 1;
        for (Map.Entry<String, Integer> newEntry : result.entrySet()) {
            //get first five
            if (flag <= 5) {
                finalResult.put(newEntry.getKey(), newEntry.getValue());
                ++flag;
            }
        }
        JSONObject jsonResult = new JSONObject(finalResult);
        return jsonResult.toString();
    }

    /**
     *
     * @param rawData
     * @return java.lang.String
     * @author Qingyuan Hu
     * @date 2022/8/7 10:54
    */
    public String findTagVals(JSONObject rawData){ //find "Value" in "Tags" in jsonObject
        if(rawData.isEmpty()){
            return null;
        }
        Iterator<String> keys = rawData.keys();
        StringBuilder key = new StringBuilder("");
        HashMap<String,Integer> resultTemp = new HashMap<String,Integer>();
        if(keys.hasNext()){
            key.append((String)keys.next());
        }else{
            return null;
        }
        String p = new String("(\"Tags\"|\"TagSet\"):\\[[^\\[\\]]+\\]");
        String str =rawData.toString();
        Pattern pattern = Pattern.compile(p);
        Matcher matcher = pattern.matcher(str);
        while (matcher.find()) {
            String st= matcher.group(0);
            JSONObject tags = new JSONObject("{"+st+"}");
            JSONArray arr = tags.getJSONArray("Tags");
            for(int i = 0; i<tags.length();i++){
                JSONObject tag = arr.getJSONObject(i);
                String k = tag.getString("Value");
                if(resultTemp.containsKey(k)){
                    resultTemp.compute(k,(KEY,VAL)-> VAL + 1);
                }else{
                    resultTemp.put(k,1);
                }
            }
        }
        Map<String,Integer> result = sortByValue(resultTemp);
        Map<String, Integer> finalResult = new HashMap<String, Integer>();
        int flag = 1;
        for (Map.Entry<String, Integer> newEntry : result.entrySet()) {
            //get first five
            if (flag <= 5) {
                finalResult.put(newEntry.getKey(), newEntry.getValue());
                ++flag;
            }
        }
        JSONObject jsonResult = new JSONObject(finalResult);
        return jsonResult.toString();
    }

    /**
     *
     * @param ipPermission
     * @return java.lang.String
     * @author Qingyuan Hu
     * @date 2022/8/7 10:54
    */
    public String findUsualPort(JSONObject ipPermission){ // find most usual port
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

    /**
     *
     * @param
     * @return java.lang.Integer
     * @author Qingyuan Hu
     * @date 2022/8/7 10:55
    */
    public Integer gradedNumber() { // find number of grades
        Integer userNumber = 0;
        List<User> userList = userService.getAll();
        for (User user : userList) {
            if (user.getGrade() != null){
                userNumber ++;
            }
        }
        return userNumber;
    }

    /**
     *
     * @param jsonString
     * @return com.example.dataprep.common.Result
     * @author Qingyuan Hu
     * @date 2022/8/7 10:55
    */
    @CrossOrigin( origins ="http://localhost:3000")
    @RequestMapping(path = "/scoring", method = RequestMethod.PUT)
    public Result update(@RequestBody String jsonString){ //get score from front-end and update database
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
