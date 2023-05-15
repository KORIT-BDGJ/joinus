package com.portfolio.joinus.joinus.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.joinus.joinus.dto.post.PostReqDto;
import com.portfolio.joinus.joinus.entity.ApplicantList;
import com.portfolio.joinus.joinus.entity.Post;

@Mapper
public interface PostRepository {
	
	public Post getPost(int postId);

	// 등록
	public int registePost(PostReqDto postReqDto);
	
	// post_applicant_list_tb에서 id로 list 불러오기
	public List<ApplicantList> getApplicantListByPostId(int postId);

}
