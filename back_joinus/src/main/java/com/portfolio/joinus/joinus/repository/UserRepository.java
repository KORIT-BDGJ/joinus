package com.portfolio.joinus.joinus.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
<<<<<<< HEAD
public interface UserRepository {

=======
public class UserRepository {
	public User findUserByEmail(String email);
>>>>>>> origin/front-ky
}
