package com.portfolio.joinus.joinus.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.entity.ApplicantList;
import com.portfolio.joinus.joinus.entity.AttendList;
import com.portfolio.joinus.joinus.entity.Comment;
import com.portfolio.joinus.joinus.entity.OwnerPostList;
import com.portfolio.joinus.joinus.entity.Post;
import com.portfolio.joinus.joinus.entity.Search;

@Mapper
public interface PostRepository {
	
	public Post getPost(int postId);

	// 게시글 작성
	public int registePost(PostReqDto postReqDto);
	
	// 등록&조회
	public List<Post> getPostList(Map<String, Object> map);
	public int getTotalCount(Map<String, Object> map);
	
	// search 카테고리 가져오기
	public List<Search> getSearchs();

	// post_applicant_list_tb에서 id로 list 불러오기
	public List<ApplicantList> getApplicantListByPostId(int postId);
	
	// post_attend_list_tb에서 id로 list 불러오기
	public List<AttendList> getAttendListByPostId(int postId);
	// comment_tb에서 id로 불러오기
	public List<Comment> getCommentByPostId(int postId);

	public List<OwnerPostList> getOwnerPostListByUserId(int userId);

}
