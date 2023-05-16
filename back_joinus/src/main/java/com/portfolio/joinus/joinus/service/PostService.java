package com.portfolio.joinus.joinus.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.portfolio.joinus.joinus.dto.post.GetPostRespDto;
import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.dto.post.SearchPostReqDto;
import com.portfolio.joinus.joinus.dto.post.SearchPostRespDto;
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
	
	public Map<String, Object> getRegistePost(SearchPostReqDto searchPostReqDto) {
		List<SearchPostRespDto> list = new ArrayList<>();
		
		int index = (searchPostReqDto.getPage() - 1) * 10;
		
		Map<String, Object> map = new HashMap<>();
		map.put("index", index);
		
		postRepository.getPostList(map).forEach(post -> {
			list.add(post.toDto());
		});
		
		int totalCount = postRepository.getTotalCount(map);
		
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("totalCount", totalCount);
		responseMap.put("PostList", list);
		
		return responseMap;
	}
}
