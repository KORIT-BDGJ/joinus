package com.portfolio.joinus.joinus.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.GetMapping;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.dto.post.SearchPostReqDto;
import com.portfolio.joinus.joinus.entity.Post;
import com.portfolio.joinus.joinus.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class PostController {

	private final PostService postService;
	
	@GetMapping("/post/{postId}")
	public ResponseEntity<?> getPost(@PathVariable int postId) {
		return ResponseEntity.ok().body(postService.getPost(postId)) ;
	}
	
	// 게시물 등록
	@PostMapping("/post/register")
	public ResponseEntity<?> registePost(@RequestBody PostReqDto postReqDto) {
		return ResponseEntity.ok().body(postService.registePost(postReqDto));
	}
	
	@GetMapping("/post/list")
	public ResponseEntity<?> getPostList(SearchPostReqDto searchPostReqDto) {
		return ResponseEntity.ok().body(postService.getPostList(searchPostReqDto));
	}
	
	@GetMapping("/categories")
	public ResponseEntity<?> getcategories() {
		return ResponseEntity.ok().body(postService.getSearchs());
	}

	@GetMapping("/post/{postId}/applicant/list")
	public ResponseEntity<?> getApplicant(@PathVariable int postId) {
		System.out.println(postService.getApplicantListByPostId(postId));
		return ResponseEntity.ok().body(postService.getApplicantListByPostId(postId));
	}
	
	@GetMapping("/post/{postId}/attend/list")
	public ResponseEntity<?> getAttend(@PathVariable int postId) {
		System.out.println(postService.getAttendListByPostId(postId));
		return ResponseEntity.ok().body(postService.getAttendListByPostId(postId));
	}
	
	@GetMapping("/post/{postId}/comment")
	public ResponseEntity<?> getComment(@PathVariable int postId) {
		System.out.println(postService.getCommentByPostId(postId));
		return ResponseEntity.ok().body(postService.getCommentByPostId(postId));
	}

	
}
