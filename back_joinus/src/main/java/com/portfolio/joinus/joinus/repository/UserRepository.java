package com.portfolio.joinus.joinus.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public class UserRepository {
	public User findUserByEmail(String email);
}
