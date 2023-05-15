package com.portfolio.joinus.joinus.service;

import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.dto.post.GetPostRespDto;
import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.entity.Post;
import com.portfolio.joinus.joinus.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	
	private final PostRepository postRepository;
	
	
	public GetPostRespDto getPost(int postId) {
		return postRepository.getPost(postId).toGetPostDto();
	}
	
	// 등록
	public int registePost(PostReqDto postReqDto) {
		return postRepository.registePost(postReqDto);
	}
}
