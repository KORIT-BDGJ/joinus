package com.portfolio.joinus.joinus.service;

import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.dto.post.GetPostRespDto;
import com.portfolio.joinus.joinus.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

	private final PostRepository postRepository;
	
	public GetPostRespDto getPost(int postId) {
		return postRepository.getPost(postId).toGetPostDto();
	}
}
