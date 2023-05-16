package com.portfolio.joinus.joinus.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.entity.Post;

@Mapper
public interface PostRepository {
	
	public Post getPost(int postId);

	// 게시글 작성
	public int registePost(PostReqDto postReqDto);
	
	// 등록&조회
	public List<Post> getPostList(Map<String, Object> map);
	public int getTotalCount(Map<String, Object> map);

}
