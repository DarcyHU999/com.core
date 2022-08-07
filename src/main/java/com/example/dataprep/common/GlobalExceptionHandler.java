package com.example.dataprep.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLIntegrityConstraintViolationException;


/**
 * Used for uniform exception handling
 * @author Yanjun
 * @date 2022/8/6 21:32
 */
@ControllerAdvice(annotations = {RestController.class, Controller.class})
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {
    /**
     * Used to resolve the exception when a user registers with a duplicate username
     * @param ex
     * @return com.example.dataprep.common.Result
     * @author Yanjun
     * @date 2022/8/6 21:33
     */
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public Result exceptionHandler(SQLIntegrityConstraintViolationException ex) {
        log.error(ex.getMessage());
        if (ex.getMessage().contains("Duplicate")) {
            String[] split = ex.getMessage().split(" ");
            String msg = split[2].split("'")[1] + " has existed";
            Integer code = Code.SAVE_ERR;
            return new Result(code, null, msg);
        }
        return new Result(Code.SAVE_ERR, null, "Unknown error");
    }
}
