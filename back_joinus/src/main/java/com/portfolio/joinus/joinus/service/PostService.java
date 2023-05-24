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
import com.portfolio.joinus.joinus.dto.post.HostPostListRespDto;
import com.portfolio.joinus.joinus.dto.post.OwnerPostListRespDto;
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
	
	public Map<String, Object> getPostList(SearchPostReqDto searchPostReqDto) {
		List<SearchPostRespDto> list = new ArrayList<>();
		
		int index = (searchPostReqDto.getPage() - 1) * 10;
		
		Map<String, Object> map = new HashMap<>();
		map.put("index", index);
		map.put("sportsId", searchPostReqDto.getSportsId());
		map.put("regionId", searchPostReqDto.getRegionId());
		map.put("searchType", searchPostReqDto.getSearchType());
		map.put("searchValue", searchPostReqDto.getSearchValue());
		
		postRepository.getPostList(map).forEach(post -> {
			list.add(post.toDto());
		});
		
		int totalCount = postRepository.getTotalCount(map);
		
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("totalCount", totalCount);
		responseMap.put("postList", list);
		
		return responseMap;
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
	
	public List<OwnerPostListRespDto> getOwnerPostListByUserId(int userId) {
		
		List<OwnerPostListRespDto> list = new ArrayList<>();
		
		postRepository.getOwnerPostListByUserId(userId).forEach(ownerPostData -> {
			list.add(ownerPostData.toDto());
		});
		
		return list;
	}

	public List<HostPostListRespDto> getMyApplicantPostListByUserId(int userId) {
		
		List<HostPostListRespDto> list = new ArrayList<>();
		
		postRepository.getMyApplicantPostListByUserId(userId).forEach(hostPostData -> {
			list.add(hostPostData.toDto());
		});
		return list;
	}
	
	public List<HostPostListRespDto> getMyAttendPostListByUserId(int userId) {
			
		List<HostPostListRespDto> list = new ArrayList<>();
		
		postRepository.getMyAttendPostListByUserId(userId).forEach(hostPostData -> {
			list.add(hostPostData.toDto());
		});
		return list;
	}
	
	
	// 참석하기
	public int applyPost(int postId, int userId, int stateId, int levelId) {
	      Map<String, Object> map = new HashMap<>();
	      map.put("postId", postId);
	      map.put("userId", userId);
	      map.put("stateId", stateId);
	      map.put("levelId", levelId);
	      
	      return postRepository.applyPost(map);
	}
	
	// 참석취소
	public int cancelApplyPost(int postId, int userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("postId", postId);
		map.put("userId", userId);
		
		return postRepository.cancelApplyPost(map);
	}
	
	// 댓글작성
	public int commentSubmit(int postId, Object userId, Object comment) {
	      Map<String, Object> map = new HashMap<>();
	      map.put("postId", postId);
	      map.put("userId", userId);
	      map.put("comment", comment);
	      
	      return postRepository.commentSubmit(map);
	}
	
	// 댓글삭제
	public int commentDelete(int postId, int commentId) {
		Map<String, Object> map = new HashMap<>();
		map.put("postId", postId);
		map.put("commentId", commentId);
		
		return postRepository.commentDelete(map);
	}
	
	// 참석자 내보내기
	public int attendDelete(int postId, int userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("postId", postId);
		map.put("userId", userId);
		
		return postRepository.attendDelete(map);
	}
	
	// 신청자 내보내기
	public int applicantDelete(int postId, int userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("postId", postId);
		map.put("userId", userId);
		
		return postRepository.applicantDelete(map);
	}
	
	// 신청자 받기
	public int applicantAccept(int postId, int userId, int stateId, int levelId) {
	      Map<String, Object> map = new HashMap<>();
	      map.put("postId", postId);
	      map.put("userId", userId);
	      map.put("stateId", stateId);
	      map.put("levelId", levelId);
	      
	      return postRepository.applicantAccept(map);
	}
	

}
