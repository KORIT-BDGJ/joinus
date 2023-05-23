package com.portfolio.joinus.joinus.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.entity.Authority;
import com.portfolio.joinus.joinus.entity.HostPostList;
import com.portfolio.joinus.joinus.entity.OwnerPostList;
import com.portfolio.joinus.joinus.entity.Point;
import com.portfolio.joinus.joinus.entity.SportsLikes;
import com.portfolio.joinus.joinus.entity.User;
import com.portfolio.joinus.joinus.entity.UserInfo;

@Mapper
public interface UserRepository {
	
	public User findUserByEmail(String email);
	
	public int updatePassword(User user); 
	
	public int updateAddress(User user);

	public int updateProvider(User user);
	
	
	
	
	// registerUser 하는 동작 하나로, DB 테이블 5개 개별로 생성
	// 유저 등록
	public int registerUser (User user);
	
	// 권한 등록
	public int registerAuthority(Authority authority);
	
	// 포인트 등록
    public int registerPoint(Point point);

    // 사용자 정보 등록
    public int registerUserInfo(UserInfo userInfo);

    // 사용자가 좋아하는 스포츠 등록
    public int registerSportsLikes(SportsLikes sportsLikes);
	
	List<OwnerPostList> getOwnerPostListByUserId(int userId);
	
	List<HostPostList> getApplicantPostListByUserId(int userId);
}
