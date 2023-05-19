package com.portfolio.joinus.joinus.dto.post;

import java.util.Date;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetPostRespDto {
	private int postId;
	private int writerId;
	private String writerNickName;
	private String image;
	private String title;
	private String sportsName;
	private String levelName;
	private String stateName;
	private String regionName;
	private Date deadLine;
	private int recruitsCount;
	private String genderName;
	private String text;
}
