package com.portfolio.joinus.joinus.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.entity.Post;

@Mapper
public interface PostRepository {
	
	// 등록
	public int registePost(Post post);
	// 전체 조회
	public List<Post> getPost();

}
