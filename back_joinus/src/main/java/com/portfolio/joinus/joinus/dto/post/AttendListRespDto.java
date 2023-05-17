package com.portfolio.joinus.joinus.dto.post;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AttendListRespDto {
	private int postId;
	private int userId;
	private String image;
	private String nickName;
	private String stateName;
	private String levelName;
}
