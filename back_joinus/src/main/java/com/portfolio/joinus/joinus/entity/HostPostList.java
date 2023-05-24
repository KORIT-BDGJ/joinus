package com.portfolio.joinus.joinus.entity;

import com.portfolio.joinus.joinus.dto.post.HostPostListRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class HostPostList {
	private int hostPostListId;
	private int userId;
	private int postId;
	private String title;
	
	private User user;
	private Post post;

	public HostPostListRespDto toDto() {
		return HostPostListRespDto.builder()
				.hostPostListId(hostPostListId)
				.userId(userId)
				.postId(postId)
				.title(title)
				.build();
	}

}
