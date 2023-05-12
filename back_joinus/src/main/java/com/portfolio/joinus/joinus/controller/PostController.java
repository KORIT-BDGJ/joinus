package com.portfolio.joinus.joinus.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;
import com.portfolio.joinus.joinus.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;
	
	@GetMapping("/post/{postId}")
	public ResponseEntity<?> getPost(@PathVariable int postId) {
		return ResponseEntity.ok().body(postService.getPost(postId)) ;
	}
	
	
}
