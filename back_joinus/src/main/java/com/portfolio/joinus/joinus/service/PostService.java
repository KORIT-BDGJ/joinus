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
import com.portfolio.joinus.joinus.entity.HostPostList;
import com.portfolio.joinus.joinus.entity.OwnerPostList;
import com.portfolio.joinus.joinus.repository.PostRepository;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
	
	
	
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
	
    public GetPostRespDto getPost(int postId) {
        return postRepository.getPost(postId).toGetPostDto();
    }

    public int registePost(PostReqDto postReqDto) {
        int postId = postRepository.registePost(postReqDto);

        // owner_post_list_tb에 데이터 저장
        OwnerPostList ownerPostList = OwnerPostList.builder()
            .ownerPostListId(0)
            .postId(postReqDto.getPostId())
            .userId(postReqDto.getWriterId())
            .build();
        saveOwnerPostList(ownerPostList);

        return postId;
    }

    public void saveOwnerPostList(OwnerPostList ownerPostList) {
        postRepository.saveOwnerPostList(ownerPostList);
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
        
//        int totalPages = (int) Math.ceil((double) totalCount / 10);
//        if(totalPages == 0) {
//        	totalPages = 1;
//        } else if(totalPages > 1 && totalPages * 10 > totalCount) {
//        	totalPages = (int) Math.ceil((double) totalCount / 10);
//        }

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("totalCount", totalCount);
//        responseMap.put("totalPages", totalPages);
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
    
    public List<HostPostListRespDto> getHostPostListByUserId(int userId) {
        List<HostPostListRespDto> list = new ArrayList<>();

        postRepository.getHostPostListByUserId(userId).forEach(hostPostData -> {
            if (hostPostData.getUserId() == userId) {
                list.add(hostPostData.toDto());
            }
        });

        return list;
    }



    public List<HostPostListRespDto> getMyApplicantPostListByUserId(int userId) {
        List<HostPostListRespDto> list = new ArrayList<>();

        postRepository.getMyApplicantPostListByUserId(userId).forEach(hostPostData -> {
            if (hostPostData.getUserId() == userId) {
                list.add(hostPostData.toDto());
            }
        });

        return list;
    }

    
    public List<AttendListRespDto> getMyApplicantAcceptPostListByUserId(int userId) {
        return postRepository.getMyApplicantAcceptPostListByUserId(userId);
    }
    
    public List<AttendListRespDto> getMyfinishPostListByUserId(int userId) {
        return postRepository.getMyfinishPostListByUserId(userId);
    }
    
    public int applyPost(int postId, int userId, int stateId, int levelId) {
        Map<String, Object> map = new HashMap<>();
        map.put("postId", postId);
        map.put("userId", userId);
        map.put("stateId", stateId);
        map.put("levelId", levelId);

        int result = postRepository.applyPost(map);

        if (result > 0) {
            // host_post_list_tb에 데이터 저장
            HostPostList hostPostList = HostPostList.builder()
                .hostPostListId(0)
                .postId(postId)
                .userId(userId)
                .build();
            saveMyApplicantPostList(hostPostList);
        }

        return result;
    }

    public int saveMyApplicantPostList(HostPostList hostPostList) {
        return postRepository.saveMyApplicantPostList(hostPostList);
    }
    


    
}
