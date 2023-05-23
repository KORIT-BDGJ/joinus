package com.portfolio.joinus.joinus.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok().body(postService.getPost(postId));
    }

    @PostMapping("/post/register")
    public ResponseEntity<?> registePost(@RequestBody PostReqDto postReqDto) {
        postService.registePost(postReqDto);
        return ResponseEntity.ok().body(postReqDto.getPostId());
    }

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

    @GetMapping("/post/{userId}/owner")
    public ResponseEntity<?> getOwnerPostList(@PathVariable int userId) {
        return ResponseEntity.ok().body(postService.getOwnerPostListByUserId(userId));
    }

    @GetMapping("/post/{userId}/myapplicant/list")
    public ResponseEntity<?> getMyApplicantPostList(@PathVariable int userId) {
        return ResponseEntity.ok().body(postService.getMyApplicantPostListByUserId(userId));
    }

    @GetMapping("/post/{userId}/myattend/list")
    public ResponseEntity<?> getMyAttendPostList(@PathVariable int userId) {
        return ResponseEntity.ok().body(postService.getMyAttendPostListByUserId(userId));
    }

    @PostMapping("/post/apply/{postId}")
    public ResponseEntity<?> applyPost(@PathVariable int postId, @RequestBody Map<String, Integer> requestMap) {
        return ResponseEntity.ok().body(postService.applyPost(postId, requestMap.get("userId"), requestMap.get("stateId"), requestMap.get("levelId")));
    }

    @DeleteMapping("/post/cancel/apply/{postId}")
    public ResponseEntity<?> cancelApplyPost(@PathVariable int postId, @RequestParam int userId) {
        return ResponseEntity.ok().body(postService.cancelApplyPost(postId, userId));
    }

    @GetMapping("/post/{postId}/comment")
    public ResponseEntity<?> getComment(@PathVariable int postId) {
        return ResponseEntity.ok().body(postService.getCommentByPostId(postId));
    }

    @PostMapping("/post/{postId}/comment/submit")
    public ResponseEntity<?> commentSubmit(@PathVariable int postId, @RequestBody Map<String, Object> requestMap) {
        return ResponseEntity.ok().body(postService.commentSubmit(postId, requestMap.get("userId"), requestMap.get("comment")));
    }
}
