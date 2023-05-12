package com.portfolio.joinus.joinus.service;

import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.entity.Post;
import com.portfolio.joinus.joinus.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	
	private final PostRepository postRepository;
	
	// 등록
	public int registePost(Post post) {
		return postRepository.registePost(post);
	}

}
