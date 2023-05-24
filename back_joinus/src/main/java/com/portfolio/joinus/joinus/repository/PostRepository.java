package com.portfolio.joinus.joinus.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.entity.ApplicantList;
import com.portfolio.joinus.joinus.entity.AttendList;
import com.portfolio.joinus.joinus.entity.Comment;
import com.portfolio.joinus.joinus.entity.HostPostList;
import com.portfolio.joinus.joinus.entity.OwnerPostList;
import com.portfolio.joinus.joinus.entity.Post;

@Mapper
public interface PostRepository {
	
	public Post getPost(int postId);

	// 게시글 작성
	public int registePost(PostReqDto postReqDto);
	
	// 등록&조회
	public List<Post> getPostList(Map<String, Object> map);
	public int getTotalCount(Map<String, Object> map);

	// post_applicant_list_tb에서 id로 list 불러오기
	public List<ApplicantList> getApplicantListByPostId(int postId);
	
	// post_attend_list_tb에서 id로 list 불러오기
	public List<AttendList> getAttendListByPostId(int postId);
	
	// comment_tb에서 id로 불러오기
	public List<Comment> getCommentByPostId(int postId);
	
	// owner_post_list_tb에 데이터 저장
	public int saveOwnerPostList(OwnerPostList ownerPostList);
	
	// owner_post_list_tb 에서 id로 list 불러오기
	public List<OwnerPostList> getOwnerPostListByUserId(int userId);
	
	// host_post_list_tb 에 데이터 저장
	public int saveMyApplicantPostList(HostPostList hostPostList);
	
	public List<HostPostList> getHostPostListByUserId(int userId);
	
	// host_post_list_tb 에서 id로 applicant_list 불러오기
	public List<HostPostList> getMyApplicantPostListByUserId(int userId);
	
	// host_post_list_tb 에 데이터 저장
	public int saveMyAttendPostListByUserId(HostPostList hostPostList);
	
	// host_post_list_tb 에서 id로 attend_list 불러오기 
	public List<HostPostList> getMyAttendPostListByUserId(int userId);
	
	
	
	public int applyPost(Map<String, Object> map);
	public int cancelApplyPost(Map<String, Object> map);
	public int commentSubmit(Map<String, Object> map);
}