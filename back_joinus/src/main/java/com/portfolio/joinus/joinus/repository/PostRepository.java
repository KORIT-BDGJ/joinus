package com.portfolio.joinus.joinus.repository;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.entity.Post;

@Mapper
public interface PostRepository {
	
	public Post getPost(int postId);

	// 등록
	public int registePost(PostReqDto postReqDto);

}
