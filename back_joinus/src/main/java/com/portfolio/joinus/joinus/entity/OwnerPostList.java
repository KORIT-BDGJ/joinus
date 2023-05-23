package com.portfolio.joinus.joinus.entity;

import com.portfolio.joinus.joinus.dto.post.OwnerPostListRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OwnerPostList {
	private int ownerPostListId;
	private int userId;
	private int postId;
	private String title;
	
	private User user;
	private Post post;
	
	public OwnerPostListRespDto toDto() {
		return OwnerPostListRespDto.builder()
				.ownerPostListId(ownerPostListId)
				.userId(userId)
				.postId(postId)
				.title(title)
				.build();
	}
}
