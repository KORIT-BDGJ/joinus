package com.portfolio.joinus.joinus.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.dto.post.SearchPostReqDto;
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
	
	// 게시물 등록
	@PostMapping("/post/register")
	public ResponseEntity<?> registePost(@RequestBody PostReqDto postReqDto) {
		postService.registePost(postReqDto);
		return ResponseEntity.ok().body(postReqDto.getPostId());
	}
	
	// 게시물 전체 조회
	@GetMapping("/post/list")
	public ResponseEntity<?> getPostList(SearchPostReqDto searchPostReqDto) {
		return ResponseEntity.ok().body(postService.getPostList(searchPostReqDto));
	}
	// 게시글 신청자 목록 조회
	@GetMapping("/post/{postId}/applicant/list")
	public ResponseEntity<?> getApplicant(@PathVariable int postId) {
		System.out.println(postService.getApplicantListByPostId(postId));
		return ResponseEntity.ok().body(postService.getApplicantListByPostId(postId));
	}
	// 게시글 참여자 목록 조회
	@GetMapping("/post/{postId}/attend/list")
	public ResponseEntity<?> getAttend(@PathVariable int postId) {
		System.out.println(postService.getAttendListByPostId(postId));
		return ResponseEntity.ok().body(postService.getAttendListByPostId(postId));
	}
	// 게시글 댓글 목록 조회
	@GetMapping("/post/{postId}/comment")
	public ResponseEntity<?> getComment(@PathVariable int postId) {
		System.out.println(postService.getCommentByPostId(postId));
		return ResponseEntity.ok().body(postService.getCommentByPostId(postId));
	}
	// 내가 작성한 글 조회
	@GetMapping("/post/{userId}/owner")
	public ResponseEntity<?> getOwnerPostList(@PathVariable int userId) {
	     
	    return ResponseEntity.ok().body(postService.getOwnerPostListByUserId(userId)) ;
	}
	
	// 내가 신청한 게시글 목록 조회
	@GetMapping("/post/{userId}/myapplicant/list")
	public ResponseEntity<?> getMyApplicantPostList(@PathVariable int userId) {
	    return ResponseEntity.ok().body(postService.getMyApplicantPostListByUserId(userId));
	}
	// 참여 완료한 게시글 목록 조회
	@GetMapping("/post/{userId}/myattend/list")
	public ResponseEntity<?> getMyAttendPostList(@PathVariable int userId) {
	    return ResponseEntity.ok().body(postService.getMyAttendPostListByUserId(userId));
	}

	

	
}
