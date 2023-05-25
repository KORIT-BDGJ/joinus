package com.portfolio.joinus.joinus.dto.post;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ApplicantListRespDto {
	private int postId;
	private int userId;
	private String image;
	private String nickName;
	private String stateName;
	private int stateId;
	private String levelName;
	private int levelId;

}