package com.portfolio.joinus.joinus.service;

import org.springframework.stereotype.Service;

<<<<<<< HEAD
import com.portfolio.joinus.joinus.dto.post.GetPostRespDto;
=======
import com.portfolio.joinus.joinus.entity.Post;
>>>>>>> main
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

	private final PostRepository postRepository;
	
	public GetPostRespDto getPost(int postId) {
		return postRepository.getPost(postId).toGetPostDto();
	}
}
