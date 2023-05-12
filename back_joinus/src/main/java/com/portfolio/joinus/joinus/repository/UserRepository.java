package com.portfolio.joinus.joinus.repository;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.entity.User;

@Mapper
public interface UserRepository {

	public User findUserByEmail(String email);

}
