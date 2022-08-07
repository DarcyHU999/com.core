package com.example.dataprep.api;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.dataprep.common.Code;
import com.example.dataprep.common.Result;
import com.example.dataprep.model.User;
import com.example.dataprep.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * User registration
     * @param user
     * @return com.example.dataprep.common.Result
     * @author Yanjun
     * @date 2022/8/6 21:22
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Result save(@RequestBody User user) {
        boolean flag = userService.save(user);
        return new Result(flag ? Code.SAVE_OK : Code.SAVE_ERR, flag);
    }

    /**
     * Delete a user by ID
     * @param id
     * @return com.example.dataprep.common.Result
     * @author Yanjun
     * @date 2022/8/6 21:22
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        boolean flag = userService.delete(id);
        return new Result(flag ? Code.DELETE_OK : Code.DELETE_ERR, flag);
    }

    /**
     * Modify user information
     * @param user
     * @return com.example.dataprep.common.Result
     * @author Yanjun
     * @date 2022/8/6 21:25
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping
    public Result update(@RequestBody User user) {
        boolean flag = userService.update(user);
        System.out.println(user);
        return new Result(flag ? Code.UPDATE_OK : Code.UPDATE_ERR, flag);
    }

    /**
     * Queries users by ID
     * @param id
     * @return com.example.dataprep.common.Result
     * @author Yanjun
     * @date 2022/8/6 21:26
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public Result getById(@PathVariable Integer id) {
        User user = userService.getById(id);
        Integer code = user != null ? Code.GET_OK : Code.GET_ERR;
        String msg = user != null ? "Query successfully!" : "Data query failure";
        return new Result(code, user, msg);
    }

    /**
     * Query all users
     * @param
     * @return com.example.dataprep.common.Result
     * @author Yanjun
     * @date 2022/8/6 21:27
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public Result getAll() {
        List<User> userList = userService.getAll();
        Integer code = userList != null ? Code.GET_OK : Code.GET_ERR;
        String msg = userList != null ? "Query successfully!" : "Data query failure";
        return new Result(code, userList, msg);
    }

    /**
     * User login
     * @param request
     * @param user
     * @return com.example.dataprep.common.Result
     * @author Yanjun
     * @date 2022/8/6 21:27
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public Result login(HttpServletRequest request, @RequestBody User user) {
        String password = user.getPassword();
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, user.getUsername());
        User user1 = userService.getOne(queryWrapper);
        if (user1 == null) {
            Integer code = Code.LOGIN_ERR;
            String msg = "User does not exist";
            return new Result(code, null, msg);
        }
        if (!user1.getPassword().equals(password)) {
            Integer code = Code.LOGIN_ERR;
            String msg = "Password error";
            return new Result(code, null, msg);
        }
        request.getSession().setAttribute("user", user.getId());
        Integer code = Code.LOGIN_OK;
        String msg = "Login successfully";
        return new Result(code, user1, msg);
    }

    /**
     * User logout
     * @param request
     * @return com.example.dataprep.common.Result
     * @author Yanjun
     * @date 2022/8/6 21:38
    */
    @PostMapping("/logout")
    public Result logout(HttpServletRequest request){
        Integer code = Code.LOGIN_OK;
        String msg = "Logout successfully";
        request.getSession().removeAttribute("employee");
        return new Result(code, null, msg);
    }
}