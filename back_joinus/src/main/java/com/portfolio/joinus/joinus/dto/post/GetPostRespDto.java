package com.portfolio.joinus.joinus.dto.post;

import java.util.Date;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetPostRespDto {
	private int postId;
	private int writerId;
	private int userId;
	private String writerNickName;
	private String image;
	private String title;
	private int sportsId;
	private String sportsName;
	private int levelId;
	private String levelName;
	private int stateId;
	private String stateName;
	private int regionId;
	private String regionName;
	private Date deadLine;
	private int recruitsCount;
	private int genderId;
	private String genderName;
	private String text;
	private int point;
}
