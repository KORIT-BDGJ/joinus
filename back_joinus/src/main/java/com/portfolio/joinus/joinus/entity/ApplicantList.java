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
	private String title;
	private int userId;
	private String image;
	private String nickName;
	private String stateName;
	private int stateId;
	private String levelName;
	private int levelId;
	
	private User user;
	private Post post;
	private State state;
	private Level level;
	
	public ApplicantListRespDto toDto() {
		return ApplicantListRespDto.builder()
				.postId(postId)
				.title(title)
				.userId(userId)
				.image(image)
				.nickName(nickName)
				.stateName(stateName)
				.stateId(stateId)
				.levelName(levelName)
				.levelId(levelId)
				.build();
	}

}
