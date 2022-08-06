package com.example.dataprep.api;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.dataprep.common.Code;
import com.example.dataprep.common.Result;
import com.example.dataprep.model.User;
import com.example.dataprep.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * User registration
     * @param user
     * @return
     */
    @PostMapping
    public Result save(@RequestBody User user) {
        boolean flag = userService.save(user);
        return new Result(flag ? Code.SAVE_OK : Code.SAVE_ERR, flag);
    }

    /**
     * User deletion
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        boolean flag = userService.delete(id);
        return new Result(flag ? Code.DELETE_OK : Code.DELETE_ERR, flag);
    }

    /**
     * User Modification Data
     * @param user
     * @return
     */
    @PutMapping
    public Result update(@RequestBody User user) {
        boolean flag = userService.update(user);
        System.out.println(user);
        return new Result(flag ? Code.UPDATE_OK : Code.UPDATE_ERR, flag);
    }

    /**
     * Query a user by ID
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public Result getById(@PathVariable Integer id) {
        User user = userService.getById(id);
        Integer code = user != null ? Code.GET_OK : Code.GET_ERR;
        String msg = user != null ? "Query successfully!" : "Data query failure";
        return new Result(code, user, msg);
    }

    /**
     * Query all users
     * @return
     */
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
     * @return
     */
    @PostMapping("/login")
    public Result login(HttpServletRequest request, @RequestBody User user) {
        log.info("{}", user.toString());
        String password = user.getPassword();
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, user.getUsername());
        User user1 = userService.getOne(queryWrapper);
        if (user1 == null) {
            Integer code = Code.LOGIN_ERR;
            String msg = "用户名不存在";
            return new Result(code, null, msg);
        }
        if (!user1.getPassword().equals(password)) {
            Integer code = Code.LOGIN_ERR;
            String msg = "密码错误";
            return new Result(code, null, msg);
        }
        request.getSession().setAttribute("user", user1.getId());
        log.info("用户id位{}", user1.getId());
        Integer code = Code.LOGIN_OK;
        String msg = "登录成功";
        return new Result(code, user1, msg);
    }

    @PostMapping("/logout")
    public Result logout(HttpServletRequest request) {
        request.getSession().removeAttribute("user");
        Integer code = Code.LOGOUT_OK;
        String msg = "退出成功";
        return new Result(code, null, msg);
    }
}
