package com.nicegis.gerhard.service;

import com.nicegis.gerhard.dto.ResponseDto;
import com.nicegis.gerhard.mapper.UserMapper;
import com.nicegis.gerhard.model.Id;
import com.nicegis.gerhard.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserMapper userMapper;

    @Autowired
    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }


    public ResponseDto Add(User postUser) {

        int num = userMapper.insert(postUser);
        ResponseDto responseDto = new ResponseDto();
        if (num > 0) {
            responseDto.setCode(200);
            responseDto.setMsg("SUCCESS");
            responseDto.setData(postUser);
        } else {
            responseDto.setCode(400);
            responseDto.setMsg("请求体参数错误");
        }

        return responseDto;
    }

    public ResponseDto Delete(int id) {
        int num = userMapper.deleteByPrimaryKey(id);
        ResponseDto responseDto = new ResponseDto();
        if (num > 0) {
            responseDto.setCode(200);
            responseDto.setMsg("SUCCESS");
        } else {
            responseDto.setCode(400);
            responseDto.setMsg("请求体参数错误");
        }
        return responseDto;
    }

    public ResponseDto Update(User postUser) {
        int num = userMapper.updateByPrimaryKey(postUser);
        ResponseDto responseDto = new ResponseDto();
        if (num > 0) {
            responseDto.setCode(200);
            responseDto.setMsg("SUCCESS");
            responseDto.setData(postUser);
        } else {
            responseDto.setCode(400);
            responseDto.setMsg("请求体参数错误");
        }
        return responseDto;
    }


    public ResponseDto Select() {
        List<User> user = userMapper.select();
        ResponseDto responseDto = new ResponseDto(user);

        return responseDto;
    }


    public ResponseDto Select(Id id) {
        User user = userMapper.selectByPrimaryKey(id.getId());
        ResponseDto responseDto = new ResponseDto(user);

        return responseDto;
    }
}