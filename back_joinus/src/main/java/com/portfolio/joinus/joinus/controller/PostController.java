package com.portfolio.joinus.joinus.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;
	
	public ResponseEntity<?> getPost(@PathVariable int postId) {
		return ResponseEntity.ok(null);
	}
}
