package com.nicegis.gerhard.controller;

import com.nicegis.gerhard.dto.ResponseDto;
import com.nicegis.gerhard.model.Id;
import com.nicegis.gerhard.service.UserService;
import com.nicegis.gerhard.model.User;
import com.sun.xml.internal.bind.v2.model.core.ID;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@Api(tags = {"用户接口"})
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping(value = "/")
    void handleLogout(HttpServletResponse response) throws IOException {
        response.sendRedirect("swagger-ui.html");
    }

    @PostMapping(value = "/add")
    @ApiOperation(value = "新增", notes = "在用户表中插入一条新纪录")
    public ResponseDto Add(
            @ApiParam(name = "post请求体", value = "前端发来的用户信息", required = true) @RequestBody User user) {
        ResponseDto<List<User>> responseDto = userService.Add(user);
        return responseDto;
    }

    @PostMapping(value = "/delete")
    @ApiOperation(value = "删除", notes = "在用户表中删除用户纪录")
    public ResponseDto Delete(
            @ApiParam(name = "post请求体", value = "需要删除记录的ID", required = true) @RequestBody Id id
    ) {
        ResponseDto<List<User>> responseDto = userService.Delete(id.getId());
        return responseDto;
    }

    @PostMapping(value = "/update")
    @ApiOperation(value = "更新", notes = "在用户表中修改纪录")
    public ResponseDto Update(
            @ApiParam(name = "post请求体",value = "前端发来的用户信息,其中必须要有id", required = true) @RequestBody User user
    ) throws IOException {
        ResponseDto<List<User>> responseDto = userService.Update(user);
        return responseDto;
    }

    @GetMapping(value = "/select")
    @ApiOperation(value = "查询所有")
    public ResponseDto Select() {
        ResponseDto<List<User>> responseDto = userService.Select();
        return responseDto;
    }

    @PostMapping(value = "/select")
    @ApiOperation(value = "根据ID查询")
    public ResponseDto Select(
            @ApiParam(name = "post请求体",value = "需要查询用户的ID", required = true) @RequestBody Id id
    ) {
        ResponseDto responseDto = userService.Select(id);
        return responseDto;
    }
}
