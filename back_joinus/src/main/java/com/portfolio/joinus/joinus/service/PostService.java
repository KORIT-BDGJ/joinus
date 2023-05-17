package com.portfolio.joinus.joinus.service;

import java.util.ArrayList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.dto.post.ApplicantListRespDto;
import com.portfolio.joinus.joinus.dto.post.AttendListRespDto;
import com.portfolio.joinus.joinus.dto.post.CommentRespDto;
import com.portfolio.joinus.joinus.dto.post.GetPostRespDto;
import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.dto.post.SearchPostReqDto;
import com.portfolio.joinus.joinus.dto.post.SearchPostRespDto;
import com.portfolio.joinus.joinus.dto.post.SearchRespDto;
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
	
	public Map<String, Object> getPostList(SearchPostReqDto searchPostReqDto) {
		List<SearchPostRespDto> list = new ArrayList<>();
		
		int index = (searchPostReqDto.getPage() - 1) * 10;
		
		Map<String, Object> map = new HashMap<>();
		map.put("index", index);
		map.put("regionId", searchPostReqDto.getRegionId());
		map.put("searchType", searchPostReqDto.getSearchType());
		map.put("searchValue", searchPostReqDto.getSearchValue());
		
		System.out.println(map);
		
		postRepository.getPostList(map).forEach(post -> {
			list.add(post.toDto());
		});
		
		int totalCount = postRepository.getTotalCount(map);
		
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("totalCount", totalCount);
		responseMap.put("postList", list);
		
		return responseMap;
	}
	
	public List<SearchRespDto> getSearchs() {
		List<SearchRespDto> list = new ArrayList<>();
		
		postRepository.getSearchs().forEach(search -> {
			list.add(search.toDto());

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
