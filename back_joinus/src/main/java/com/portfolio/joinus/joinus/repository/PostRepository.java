package com.portfolio.joinus.joinus.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.dto.post.AttendListRespDto;
import com.portfolio.joinus.joinus.dto.post.FinishListRespDto;
import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.entity.ApplicantList;
import com.portfolio.joinus.joinus.entity.AttendList;
import com.portfolio.joinus.joinus.entity.Comment;
import com.portfolio.joinus.joinus.entity.FinishList;
import com.portfolio.joinus.joinus.entity.HostPostList;
import com.portfolio.joinus.joinus.entity.OwnerPostList;
import com.portfolio.joinus.joinus.entity.Post;

@Mapper
public interface PostRepository {
	// 게시글 조회
	public Post getPost(int postId);

	// 게시글 등록
	public int registePost(PostReqDto postReqDto);

	// 게시글 조회
	public List<Post> getPostList(Map<String, Object> map);
	// 검색 조건에 따른 게시글의 총 개수를 조회
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

	//	post_applicant_list_tb에서 userId로 list 불러오기
	public List<ApplicantList> getHostApplicantListByUserId(int userId);
	
	//	post_attend_list_tb에서 userId로 list 불러오기
	public List<AttendList> getHostAttendListByUserId(int userId);

	// host_post_list_tb 에 데이터 저장
	public int saveMyApplicantPostList(HostPostList hostPostList);

	// host_post_list_tb 에서 id로 applicant_list 불러오기
	public List<HostPostList> getMyApplicantPostListByUserId(int userId);

	// post_attend_list_tb 에서 id로 list 불러오기
	public List<AttendListRespDto> getMyApplicantAcceptPostListByUserId(int userId);
	// 완료된 게시글 목록을 조회
	public List<FinishList> getMyfinishPostListByUserId(int userId);
	// 게시글 ID와 사용자 ID를 제외한 다른 사용자 ID 목록을 조회
	public List<Integer> getUserIdListByPostIdExceptUserId(int postId, int userId);
	
	 // 현재 시간 이전에 종료된 참석 목록을 가져옵니다.
    public List<AttendListRespDto> getExpiredAttendPosts(LocalDateTime currentTime);

    // 완료된 게시글 목록에 게시글을 추가합니다.
    public void createPostFinish(FinishListRespDto postFinish);

    // 현재 시간 이전에 종료된 참석 목록을 삭제합니다.
    public void deleteExpiredAttendPosts(LocalDateTime currentTime);
	
	public int applyPost(Map<String, Object> map);

	public int cancelApplyPost(Map<String, Object> map);

	public int cancelAttendPost(Map<String, Object> map);
	public int commentSubmit(Map<String, Object> map);

	public int commentDelete(Map<String, Object> map);

	public int attendDelete(Map<String, Object> map);

	public int applicantDelete(Map<String, Object> map);

	public int applicantAccept(Map<String, Object> map);

	public int updatePost(Post post);
	
	public int postDelete(int postId);
}
