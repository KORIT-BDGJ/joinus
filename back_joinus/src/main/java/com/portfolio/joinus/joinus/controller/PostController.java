package com.portfolio.joinus.joinus.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.dto.post.SearchPostReqDto;
import com.portfolio.joinus.joinus.entity.Post;
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
	
	@GetMapping("/post/{postId}/applicant/list")
	public ResponseEntity<?> getApplicant(@PathVariable int postId) {
		return ResponseEntity.ok().body(postService.getApplicantListByPostId(postId));
	}
	
	@GetMapping("/post/{postId}/attend/list")
	public ResponseEntity<?> getAttend(@PathVariable int postId) {
		return ResponseEntity.ok().body(postService.getAttendListByPostId(postId));
	}
	
	// 내가 작성한 글 조회
	@GetMapping("/post/{userId}/owner")
	public ResponseEntity<?> getOwnerPostList(@PathVariable int userId) {
	     
	    return ResponseEntity.ok().body(postService.getOwnerPostListByUserId(userId)) ;
	}
	
	// 내가 신청한 글 조회
	
	// 참여 완료한 글 조회

	//손님으로 방입장 후 신청버튼 클릭시 신청자 목록
	@PostMapping("post/apply/{postId}")
	public ResponseEntity<?> applyPost(@PathVariable int postId, @RequestBody Map<String, Integer> requestMap) {
		System.out.println(requestMap);
		System.out.println(postId);
		return ResponseEntity.ok().body(postService.applyPost(postId,  requestMap.get("userId"), requestMap.get("stateId"), requestMap.get("levelId")));
	}
	
	//신청취소버튼 클릭시 신청자 목록에서 삭제
    @DeleteMapping("post/cancle/apply/{postId}")
    public ResponseEntity<?> cancelApplyPost(@PathVariable int postId, @RequestParam int userId) {
	    return ResponseEntity.ok().body(postService.cancelApplyPost(postId, userId));
    }
    
    //댓글 불러오기
	@GetMapping("/post/{postId}/comment")
	public ResponseEntity<?> getComment(@PathVariable int postId) {
		return ResponseEntity.ok().body(postService.getCommentByPostId(postId));
	}
    
    //댓글작성
	@PostMapping("/post/{postId}/comment/submit")
	public ResponseEntity<?> commentSubmit(@PathVariable int postId, @RequestBody Map<String, Object> requestMap) {
		return ResponseEntity.ok().body(postService.commentSubmit(postId, requestMap.get("userId"), requestMap.get("comment")));
	}
	
}
