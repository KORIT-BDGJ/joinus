package com.portfolio.joinus.joinus.dto.post;

import java.util.Date;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetPostRespDto {
	private int postId;
	private String writerName;
	private String title;
	private String sportsName;
	private String levelName;
	private String stateName;
	private String regionName;
	private Date deadline;
	private int recruitsCount;
	private String genderName;
	private String text;
}
