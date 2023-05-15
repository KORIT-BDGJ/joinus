package com.portfolio.joinus.joinus.entity;

import com.portfolio.joinus.joinus.dto.post.ApplicantListRespDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ApplicantList {
	private int postId;
	private int userId;
	private int stateId;
	private int levelId;
	
	private User user;
	private Post post;
	private State state;
	private Level level;
	
	public ApplicantListRespDto toDto() {
		return ApplicantListRespDto.builder()
				.postId(post.getPostId())
				.userId(user.getUserId())
				.image(user.getUserInfo().getImage())
				.nickName(user.getUserInfo().getNickName())
				.stateName(state.getStateName())
				.levelName(level.getLevelName())
				.build();
	}

}
