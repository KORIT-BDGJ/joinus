package com.portfolio.joinus.joinus.controller;

import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

=======
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
>>>>>>> main
import com.portfolio.joinus.joinus.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;
	
<<<<<<< HEAD
	public ResponseEntity<?> getPost(@PathVariable int postId) {
		return ResponseEntity.ok(null);
	}
=======
	
	// 등록한 게시물 게시판 리스트에 가져오기
	@GetMapping()
	public ResponseEntity<?> getPost() {
		return ResponseEntity.ok(null);
	}
	
	// 게시물 등록
	@PostMapping("/post")
	public ResponseEntity<?> registePost(@RequestBody PostReqDto postReqDto) {
		return ResponseEntity.ok().body(postService.registePost(null));
	}
>>>>>>> main
}
