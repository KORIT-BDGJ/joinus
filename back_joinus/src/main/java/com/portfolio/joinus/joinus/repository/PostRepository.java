package com.portfolio.joinus.joinus.repository;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.entity.Post;

@Mapper
public interface PostRepository {
	public Post getPost(int postId);
}
