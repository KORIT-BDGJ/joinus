package com.portfolio.joinus.joinus.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
    public ResponseEntity<?> getApplicantList(@PathVariable int postId) {
        return ResponseEntity.ok().body(postService.getApplicantListByPostId(postId));
    }

	//손님으로 방입장 후 신청버튼 클릭시 신청자 목록
	@PostMapping("post/apply/{postId}")
	public ResponseEntity<?> applyPost(@PathVariable int postId, @RequestBody Map<String, Integer> requestMap) {
		System.out.println(requestMap);
		return ResponseEntity.ok().body(postService.applyPost(postId,  requestMap.get("userId"), requestMap.get("stateId"), requestMap.get("levelId")));
	}
	
    // 게시글 참여자 목록 조회
    @GetMapping("/post/{postId}/attend/list")
    public ResponseEntity<?> getAttendList(@PathVariable int postId) {
        return ResponseEntity.ok().body(postService.getAttendListByPostId(postId));
    }
    
    // 내가 작성한 글 조회
    @GetMapping("/post/{userId}/owner")
    public ResponseEntity<?> getOwnerPostList(@PathVariable int userId) {
        return ResponseEntity.ok().body(postService.getOwnerPostListByUserId(userId));
    }
    
    // 내 신청 보기
    @GetMapping("/post/{userId}/host")
    public ResponseEntity<?> getHostPostList(@PathVariable int userId) {
    	return ResponseEntity.ok().body(postService.getHostPostListByUserId(userId));
    }
    
 // 내가 신청한 게시글 목록 조회
    @GetMapping("/post/{userId}/myapplicant")
    public ResponseEntity<?> getMyApplicantPostList(@PathVariable int userId) {
        return ResponseEntity.ok().body(postService.getMyApplicantPostListByUserId(userId));
    }


    // 신청 수락된 게시글 목록 조회
    @GetMapping("/post/{userId}/myapplicantaccept")
    public ResponseEntity<?> getMyApplicantAcceptPostList(@PathVariable int userId) {
        return ResponseEntity.ok().body(postService.getMyApplicantAcceptPostListByUserId(userId));
    }

    // 참여 완료한 게시글 목록 조회
    @GetMapping("/post/{userId}/myattend")
    public ResponseEntity<?> getMyAttendPostList(@PathVariable int userId) {
        return ResponseEntity.ok().body(postService.getMyAttendPostListByUserId(userId));
    }

    
    
    //신청취소버튼 클릭시 신청자 목록에서 삭제
    @DeleteMapping("/post/cancel/apply/{postId}")
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
	
	//댓글삭제
	@DeleteMapping("/post/{postId}/comment/delete")
	public ResponseEntity<?> commentDelete(@PathVariable int postId, @RequestParam int commentId) {
		return ResponseEntity.ok().body(postService.commentDelete(postId, commentId));
	}
	
	//참석자 내보내기
	@DeleteMapping("/post/{postId}/attend/delete")
	public ResponseEntity<?> attendDelete(@PathVariable int postId, @RequestParam int userId) {
		return ResponseEntity.ok().body(postService.attendDelete(postId, userId));
	}
	
	//신청자 내보내기
	@DeleteMapping("/post/{postId}/applicant/delete")
	public ResponseEntity<?> applicantDelete(@PathVariable int postId, @RequestParam int userId) {
		return ResponseEntity.ok().body(postService.applicantDelete(postId, userId));
	}
	
    //신청자 수락
	@PostMapping("/post/{postId}/applicant/accept")
	public ResponseEntity<?> applicantAccept(@PathVariable int postId, @RequestBody Map<String, Integer> requestMap) {
		return ResponseEntity.ok().body(postService.applicantAccept(postId, requestMap.get("userId"), requestMap.get("stateId"), requestMap.get("levelId")));
	}
}
