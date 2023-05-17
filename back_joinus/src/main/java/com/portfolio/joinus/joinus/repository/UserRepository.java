package com.portfolio.joinus.joinus.repository;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.dto.auth.JwtRespDto;
import com.portfolio.joinus.joinus.dto.auth.LoginReqDto;
import com.portfolio.joinus.joinus.entity.Authority;
import com.portfolio.joinus.joinus.entity.User;

@Mapper
public interface UserRepository {
	
	public User findUserByEmail(String email);
	
	// 유저 등록
	public int registerUser (User user);
	
	public int registerAuthority(Authority authority);
	
	public int updateProvider(User user);

}
