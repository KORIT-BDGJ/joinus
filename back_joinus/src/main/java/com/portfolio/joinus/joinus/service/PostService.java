package com.portfolio.joinus.joinus.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.dto.post.ApplicantListRespDto;
import com.portfolio.joinus.joinus.dto.post.AttendListRespDto;
import com.portfolio.joinus.joinus.dto.post.CommentRespDto;
import com.portfolio.joinus.joinus.dto.post.GetPostRespDto;
import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.entity.Post;
import com.portfolio.joinus.joinus.repository.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {
	
	private final PostRepository postRepository;
	
	
	public GetPostRespDto getPost(int postId) {
		return postRepository.getPost(postId).toGetPostDto();
	}
	
	// 등록
	public int registePost(PostReqDto postReqDto) {
		return postRepository.registePost(postReqDto);
	}

	public List<ApplicantListRespDto> getApplicantListByPostId(int postId) {
		
		List<ApplicantListRespDto> list = new ArrayList<>();
		
		postRepository.getApplicantListByPostId(postId).forEach(applicantData -> {
			list.add(applicantData.toDto());
		});
		
		return list;
	}
	
	public List<AttendListRespDto> getAttendListByPostId(int postId) {
		
		List<AttendListRespDto> list = new ArrayList<>();
		
		postRepository.getAttendListByPostId(postId).forEach(attendData -> {
			list.add(attendData.toDto());
		});
		
		return list;
	}
	
	public List<CommentRespDto> getCommentByPostId(int postId) {
		
		List<CommentRespDto> list = new ArrayList<>();
		
		postRepository.getCommentByPostId(postId).forEach(commentData -> {
			list.add(commentData.toDto());
		});
		
		return list;
	}
}
