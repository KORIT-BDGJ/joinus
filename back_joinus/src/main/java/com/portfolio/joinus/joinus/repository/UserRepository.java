package com.portfolio.joinus.joinus.repository;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.entity.User;
<<<<<<< HEAD

@Mapper
public interface UserRepository {
=======

@Mapper
public interface UserRepository {

>>>>>>> main
	public User findUserByEmail(String email);

}
